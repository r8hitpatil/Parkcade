import { fgaClient } from "@/utils/openFG";
import { RequestHandler } from "express";

export const verifyAccess: RequestHandler = async (req, res,next) => {
  try {
    const { id } = req.params; // should be same as we write in :url
    const canAllow = await fgaClient.check({
      user: `user:${req.user!.id}`,
      relation : "can_edit",
      object: `location:${id}`,
    });
    const access = canAllow.allowed;
    if(!access){
        return res.status(400).json({ message : "Unauthorized access" });
    }
    req.access = canAllow;
    next();
  } catch (error) {
    return res.status(500).json({ message : "Server error" });
  }
};

export const verifyOwnerAccess:RequestHandler = async (req,res,next) => {
  try {
    const { id } = req.params; // should be same as we write in :url
    const canAllow = await fgaClient.check({
      user: `user:${req.user!.id}`,
      relation : "owner",
      object: `location:${id}`,
    });
    const access = canAllow.allowed;
    if(!access){
        return res.status(400).json({ message : "Unauthorized access" });
    }
    req.ownerAccess = canAllow;
    next();
  } catch (error) {
    return res.status(500).json({ message : "Server error" });
  }
}
