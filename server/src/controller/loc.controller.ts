import { prisma } from "@/server";
import { fgaClient } from "@/utils/openFG";
import { RequestHandler } from "express";

export const getAllLocations: RequestHandler = async (req, res) => {
  try {
    const allLocations = await prisma.location.findMany({include:{timeSlots:true}});

    return res.status(200).json({
      message: "All locations fetched successfully",
      data: allLocations,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getLocations: RequestHandler = async (req, res) => {
  try {
    const allowedLocations = await prisma.location.findMany({include:{timeSlots:true}});
    if (!allowedLocations) {
      return res.status(401).json({ message: "Locations not found" });
    }
    const sortedLocations = await fgaClient.listObjects({
      user: `user:${req.user!.id}`,
      relation: "can_edit",
      type: "location",
    });
    const allowedFields = sortedLocations.objects.map(
      (obj) => obj.split(":")[1]
    );
    const allowed = allowedLocations.filter((location) =>
      allowedFields.includes(location.id)
    );
    return res.status(200).json({ message: "Locations are : ", allowed });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createCoords: RequestHandler = async (req, res) => {
  try {
    const { location,timeSlots } = req.body;
    if (!location || !timeSlots || !Array.isArray(timeSlots)) {
      return res.status(401).json({ message: "Enter essential co-ordinates" });
    }
    const newCoord = await prisma.location.create({
      data: {
        location: location,
        timeSlots: {
          create: timeSlots.map((time: string) => ({
            timeIs: new Date(time),
          })),
        },
        ownerId: req.user!.id,
      },
      include:{
        timeSlots:true
      }
    });
    if (!newCoord) {
      return res.status(404).json({ message: "Error creating new location" });
    }
    await fgaClient.write({
      writes: [
        {
          user: `user:${req.user!.id}`,
          relation: "owner",
          object: `location:${newCoord.id}`,
        },
      ],
    });
    return res
      .status(201)
      .json({ message: "Location created", data: newCoord });
  } catch (error) {
    console.log(error as Error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateCoords: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;
    if (!location || !id) {
      return res.status(400).json({ message: "Enter complete details" });
    }
    if(!req.access){
      return res.status(403).json({ message : "Unauthorized access" })
    }
    const updateLoc = await prisma.location.update({
      where: {
        id,
      },
      data: {
        location: location,
      },
    });
    if (!updateLoc) {
      return res.status(401).json({ message: "Unable to update location" });
    }
    return res.status(200).json({ message: "Successfully updated", updateLoc });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteLoc: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Enter complete details" });
    }
    if (!req.access) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const deleteLocation = await prisma.location.delete({
      where: {
        id,
      },
    });
    if (!deleteLocation) {
      return res.status(401).json({ message: "Unable to update user" });
    }
    return res
      .status(200)
      .json({ message: "Successfully deletion", deleteLocation });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const roleEdit: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const {userId } = req.body;
    if (!userId || !id) {
      return res.status(400).json({ message: "Enter complete credentials" });
    }
    if (!req.ownerAccess) {
      return res
        .status(403)
        .json({ message: "Unauthorized access" });
    }
    const editor = await fgaClient.write({
      writes: [
        {
          user: `user:${userId}`,
          relation: "editor",
          object: `location:${id}`,
        },
      ],
    });
    if (!editor) {
      return res.status(400).json({ message: "Unable to authorize role." });
    }
    return res
      .status(200)
      .json({ message: "Editor Role authorized.", editor });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const removeEditorAccess:RequestHandler = async(req,res) => {
  try {
    const { id } = req.params;
    const {userId } = req.body;
    if (!userId || !id) {
      return res.status(400).json({ message: "Enter complete credentials" });
    }
    if (!req.ownerAccess) {
      return res
        .status(403)
        .json({ message: "Unauthorized access" });
    }
    const viewer = await fgaClient.write({
      writes: [
        {
          user: `user:${userId}`,
          relation: "viewer",
          object: `location:${id}`,
        },
      ],
      deletes: [
        {
          user: `user:${userId}`,
          relation: "editor",
          object: `location:${id}`,
        },
      ],
    });
    if (!viewer) {
      return res.status(400).json({ message: "Unable to authorize role." });
    }
    return res
      .status(200)
      .json({ message: "Authorized to role viewer", viewer });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}