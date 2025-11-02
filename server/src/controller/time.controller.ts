import { prisma } from "@/server";
import { RequestHandler } from "express"; 

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
        timeId,
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
        timeId,
      }
    });
    if (!deleted) {
      return res.status(401).json({ message: "Unable to delete slot" });
    }
    return res.status(200).json({ message: "Successfully deleted", deleted });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}