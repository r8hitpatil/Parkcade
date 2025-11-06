import { prisma } from "@/server";
import { env } from "@/utils/env";
import { fgaClient } from "@/utils/openFG";
import { RequestHandler } from "express";

export const getAllLocations: RequestHandler = async (req, res) => {
  try {
    const allLocations = await prisma.location.findMany({
      include: { timeSlots: true },
    });

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
    const allowedLocations = await prisma.location.findMany({
      include: { timeSlots: true },
    });
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
    const { location, timeSlots, pricing } = req.body;
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
        pricing,
      },
      include: {
        timeSlots: true,
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
    if (!req.access) {
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

    // Delete related time slots first
    await prisma.timeDuration.deleteMany({
      where: {
        locationId: id,
      },
    });

    // Then delete the location
    const deleteLocation = await prisma.location.delete({
      where: {
        id,
      },
    });

    if (!deleteLocation) {
      return res.status(401).json({ message: "Unable to delete location" });
    }

    return res
      .status(200)
      .json({ message: "Successfully deleted", deleteLocation });
  } catch (error) {
    console.error("Error deleting location:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const roleEdit: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { userMail } = req.body;

    if (!userMail || !id) {
      return res.status(400).json({ message: "Enter complete credentials" });
    }

    if (!req.ownerAccess) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const user = await prisma.user.findUnique({
      where: { email: userMail },
    });

    if (!user) {
      return res.status(400).json({ message: "Failed to find user." });
    }

    await fgaClient.write({
      writes: [
        {
          user: `user:${user.id}`,
          relation: "editor",
          object: `location:${id}`,
        },
      ],
    });

    return res
      .status(200)
      .json({ message: "Editor role authorized successfully." });
  } catch (error) {
    console.error("Error in roleEdit:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const removeEditorAccess: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { userMail } = req.body;

    if (!userMail || !id) {
      return res.status(400).json({ message: "Enter complete credentials" });
    }

    if (!req.ownerAccess) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const user = await prisma.user.findUnique({
      where: { email: userMail },
    });

    if (!user) {
      return res.status(400).json({ message: "Unable to find user." });
    }

    const userKey = `user:${user.id}`;
    const objectKey = `location:${id}`;

    // ✅ Check if user is already viewer
    const viewerCheck = await fgaClient.check({
      user: userKey,
      relation: "viewer",
      object: objectKey,
    });

    // ✅ Check if user is currently editor
    const editorCheck = await fgaClient.check({
      user: userKey,
      relation: "editor",
      object: objectKey,
    });

    const writes = [];
    const deletes = [];

    if (!viewerCheck.allowed) {
      writes.push({
        user: userKey,
        relation: "viewer",
        object: objectKey,
      });
    }

    if (editorCheck.allowed) {
      deletes.push({
        user: userKey,
        relation: "editor",
        object: objectKey,
      });
    }

    if (writes.length === 0 && deletes.length === 0) {
      return res
        .status(200)
        .json({ message: "No changes needed. User already a viewer." });
    }

    await fgaClient.write({ writes, deletes });

    return res
      .status(200)
      .json({ message: "Editor role removed. User is now a viewer." });
  } catch (error: any) {
    console.error("Error in removeEditorAccess:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.apiErrorMessage || error.message,
    });
  }
};

export const updatePricing: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { pricing } = req.body;
    if (!pricing || !id) {
      return res.status(400).json({ message: "Enter complete details" });
    }
    if (!req.access) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const updatedPrice = await prisma.location.update({
      where: {
        id,
      },
      data: {
        pricing,
      },
    });
    if (!updatedPrice) {
      return res.status(401).json({ message: "Unable to update Price" });
    }
    return res
      .status(200)
      .json({ message: "Successfully updated", updatedPrice });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all users who can edit a location

export const getAllEditorsForUser: RequestHandler = async (req, res) => {
  try {
    // Step 1: Find all locations accessible to the current user
    const allLocations = await prisma.location.findMany({
      include: { timeSlots: true },
    });

    const accessible = await fgaClient.listObjects({
      user: `user:${req.user!.id}`,
      relation: "can_edit",
      type: "location",
    });

    const allowedIds = accessible.objects.map((obj) => obj.split(":")[1]);

    const allowedLocations = allLocations.filter((loc) =>
      allowedIds.includes(loc.id)
    );

    // Step 2: For each allowed location, list all its editors (excluding owner)
    const editorsByLocation = await Promise.all(
      allowedLocations.map(async (loc) => {
        const response = await fgaClient.listUsers(
          {
            object: {
              type: "location",
              id: loc.id,
            },
            user_filters: [
              {
                type: "user",
              },
            ],
            relation: "can_edit", // includes both owner + editor
          },
          {
            authorizationModelId: env.FGA_MODEL_ID,
          }
        );

        // Extract user IDs
        const allUsers = response.users
          ?.map((u) => u.object?.id?.replace("user:", ""))
          .filter(Boolean) as string[];

        // Filter out the owner (if exists)
        const editorIds = allUsers.filter((id) => id !== loc.ownerId);

        const editorDetails = await prisma.user.findMany({
          where: { id: { in: editorIds } },
          select: { id: true, name: true, email: true },
        });

        return {
          locationId: loc.id,
          location: loc.location,
          editors:editorDetails,
        };
      })
    );

    return res.status(200).json({
      message: "Editors (excluding owners) for each accessible location",
      data: editorsByLocation,
    });
  } catch (error) {
    console.error("Error fetching editors:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
