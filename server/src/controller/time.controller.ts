import { prisma } from "@/server";
import { RequestHandler } from "express"; 

export const addSlot:RequestHandler = async (req,res) => {
  try {
    const { id } = req.params;
    const { timeIs } = req.body;
    
    if (!id || !timeIs) {
      return res.status(400).json({ message: "Enter complete details"});
    }
    
    if(!req.access){
      return res.status(403).json({ message : "Unauthorized access" })
    }
    
    const newSlot = await prisma.timeDuration.create({
      data: {
        locationId: id,
        timeIs: new Date(timeIs),
      }
    });
    
    if (!newSlot) {
      return res.status(401).json({ message: "Unable to add time slot" });
    }
    
    return res.status(201).json({ message: "Time slot added successfully", data: newSlot });
  } catch (error) {
    console.error("Error adding time slot:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const updateTime: RequestHandler = async (req, res) => {
  try {
    const { timeId } = req.params;
    const { timeIs } = req.body;
    if (!timeId || !timeIs) {
      return res.status(400).json({ message: "Enter complete details" });
    }
    if(!req.access){
      return res.status(403).json({ message : "Unauthorized access" })
    }
    const updated = await prisma.timeDuration.update({
      where: {
        id:timeId,
      },
      data: {
        timeIs,
      }
    });
    if (!updated) {
      return res.status(401).json({ message: "Unable to update time" });
    }
    return res.status(200).json({ message: "Successfully updated", updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteSlot:RequestHandler = async (req,res) => {
  try {
    const { timeId } = req.params;
    if (!timeId) {
      return res.status(400).json({ message: "Mention the slot" });
    }
    if(!req.access){
      return res.status(403).json({ message : "Unauthorized access" })
    }
    const deleted = await prisma.timeDuration.delete({
      where: {
        id:timeId,
      }
    });
    if (!deleted) {
      return res.status(401).json({ message: "Unable to delete slot" });
    }
    return res.status(200).json({ message: "Successfully deleted", deleted });
  } catch (error) {
  }
}

export const getSlots:RequestHandler = async (req,res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Enter complete details" });
    }
    if(!req.user){
      return res.status(403).json({ message : "Unauthorized access - Provide token" })
    }
    const getSlots = await prisma.timeDuration.findMany({
      where:{
        locationId:id
      },
    })
    return res.status(200).json({ message : "Time slots",getSlots});
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

// Update your getTimeSlot function to include booking status
// export const getTimeSlot: RequestHandler = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if(!id){
//       return res.status(400).json({ message : "Enter complete details" });
//     }
    
//     const getSlots = await prisma.timeDuration.findMany({
//       where: { locationId: id },
//       include: {
//         bookings: {
//           where: {
//             paymentStatus: 'SUCCESS',
//             isBooked: true
//           }
//         }
//       }
//     });

//     // Add isBooked flag to each slot
//     const slotsWithStatus = getSlots.map(slot => ({
//       ...slot,
//       isBooked: slot.bookings.length > 0
//     }));

//     return res.status(200).json({ message: "Time slots fetched", getSlots: slotsWithStatus });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error." });
//   }
// };
// ...existing code...

export const getTimeSlot: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    
    if(!id){
      return res.status(400).json({ message : "Enter complete details" });
    }

    const getSlots = await prisma.timeDuration.findMany({
      where: { locationId: id },
      include: {
        bookings: {
          where: {
            paymentStatus: 'SUCCESS',
            isBooked: true
          }
        }
      }
    });

    // Add isBooked flag to each slot
    const slotsWithStatus = getSlots.map(slot => ({
      id: slot.id,
      timeIs: slot.timeIs,
      locationId: slot.locationId,
      isBooked: slot.bookings.length > 0
    }));

    return res.status(200).json({ 
      message: "Time slots fetched", 
      getSlots: slotsWithStatus 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

// ...existing code...