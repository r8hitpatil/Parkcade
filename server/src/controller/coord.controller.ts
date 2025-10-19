import { prisma } from "@/server";
import { fgaClient } from "@/utils/openFG";
import { RequestHandler } from "express";

export const getAllLocations: RequestHandler = async (req, res) => {
  try {
    const allLocations = await prisma.location.findMany({});

    return res.status(200).json({
      message: "All locations fetched successfully",
      data: allLocations,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getLocations: RequestHandler = async (req, res) => {
  try {
    const allowedLocations = await prisma.location.findMany({});
    if (!allowedLocations) {
      return res.status(401).json({ message: "Locations not found" });
    }
    const sortedLocations = await fgaClient.listObjects({
      user: `user:${req.user!.id}`,
      relation: "owner",
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
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createCoords: RequestHandler = async (req, res) => {
  try {
    const { location } = req.body;
    if (!location) {
      return res.status(401).json({ message: "Enter essential co-ordinates" });
    }
    const newCoord = await prisma.location.create({
      data: {
        location: location,
        ownerId: req.user!.id,
      },
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
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateCoords: RequestHandler = async (req, res) => {
  try {
    const { id, location } = req.body;
    if (!id || !location) {
      return res.status(400).json({ message: "Enter complete details" });
    }
    const canEdit = await fgaClient.check({
      user: `user:${req.user!.id}`,
      relation: "can_edit",
      object: `location:${id}`,
    });
    if (!canEdit.allowed) {
      return res.status(403).json({ message: "Unauthorized access" });
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
      return res.status(401).json({ message: "Unable to update user" });
    }
    return res.status(200).json({ message: "Successfully updated", updateLoc });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteLoc: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Enter complete details" });
    }
    const canDelete = await fgaClient.check({
      user: `user:${req.user!.id}`,
      relation: "can_delete",
      object: `location:${id}`,
    });
    if (!canDelete.allowed) {
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
    return res.status(200).json({ message: "Successfully deletion", deleteLocation }); 
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
