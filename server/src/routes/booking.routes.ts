import { Router } from "express";
import { verifyUserToken } from "@/middleware/auth.middleware";
import { createBooking, getBookingTemplates, verifyPayment, yourBookings } from "@/controller/booking.controller";

const route = Router();

route.post('/locations/:id/book-slot',verifyUserToken,createBooking)
route.post('/bookings/verify',verifyUserToken,verifyPayment);
route.get('/get-template',verifyUserToken,getBookingTemplates);
route.get('/your-bookings',verifyUserToken,yourBookings);

const bookingRoutes = route;

export default bookingRoutes;