import { razorpay } from "@/utils/razorpay";
import { RequestHandler } from "express";
import { prisma } from "@/server";
import crypto from "crypto";
import { env } from "@/utils/env";

export const createBooking: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params; // locationId
    const { timeSlotId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!id || !timeSlotId)
      return res.status(400).json({ message: "Enter complete details" });

    const location = await prisma.location.findUnique({ where: { id } });
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    const slot = await prisma.timeDuration.findUnique({
      where: { id: timeSlotId },
    });
    if (!slot) return res.status(404).json({ message: "Time slot not found" });

    // Prevent owner from booking their own slot
    if (location.ownerId === userId) {
      return res
        .status(403)
        .json({ message: "You cannot book your own parking space" });
    }

    // Check if the slot is already booked successfully
    const existingSlotBooking = await prisma.booking.findFirst({
      where: {
        timeSlotId,
        isBooked: true,
        paymentStatus: "SUCCESS",
      },
    });

    if (existingSlotBooking) {
      return res
        .status(400)
        .json({ message: "This time slot is already booked." });
    }

    // Check if the location has only one slot and it's already booked
    const totalSlots = await prisma.timeDuration.count({
      where: { locationId: id },
    });
    if (totalSlots === 1) {
      const alreadyBooked = await prisma.booking.findFirst({
        where: {
          locationId: id,
          isBooked: true,
          paymentStatus: "SUCCESS",
        },
      });

      if (alreadyBooked) {
        return res
          .status(400)
          .json({ message: "This location is fully booked." });
      }
    }

    // Create Razorpay order
    const newOrder = await razorpay.orders.create({
      amount: Math.round(location.pricing * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Create booking entry with isBooked=false initially
    const booking = await prisma.booking.create({
      data: {
        userId,
        locationId: id,
        timeSlotId,
        amount: location.pricing,
        razorpayOrderId: newOrder.id,
        paymentStatus: "PENDING",
        isBooked: false,
      },
    });

    return res.status(201).json({
      message: "Booking created successfully. Proceed to payment.",
      newOrder,
      booking,
      key: env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyPayment: RequestHandler = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_TOKEN)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ message: "Invalid signature. Payment verification failed." });
    }

    // Update booking
    const paymentStat = await prisma.booking.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        paymentStatus: "SUCCESS",
        razorpayPaymentId: razorpay_payment_id,
        isBooked: true,
      },
    });

    return res.status(200).json({
      message: "Payment verified successfully",
      paymentStat,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getBookingTemplates: RequestHandler = async (req, res) => {
  try {
    const getAll = await prisma.location.findMany({
      include: {
        timeSlots: {
          include: {
            bookings: {
              where: {
                paymentStatus: "SUCCESS",
                isBooked: true,
              },
            },
          },
        },
      },
    });

    // Add isBooked flag to each slot
    const locationsWithStatus = getAll.map(location => ({
      ...location,
      timeSlots: location.timeSlots.map(slot => ({
        id: slot.id,
        timeIs: slot.timeIs,
        locationId: slot.locationId,
        isBooked: slot.bookings.length > 0,
      }))
    }));

    return res.status(200).json({
      message: "Fetched all locations",
      getAll: locationsWithStatus,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const yourBookings: RequestHandler = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res
        .status(401)
        .json({ message: "Unauthorised access, no token provided" });
    }
    const getBookings = await prisma.booking.findMany({
      where: {
        userId: userID,
      },
    });
    if (!getBookings) {
      return res.status(400).json({ message: "Could fetch bookings" });
    }
    return res.status(200).json({ message: "Fetched bookings", getBookings });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};
