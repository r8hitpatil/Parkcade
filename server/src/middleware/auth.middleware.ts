import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyUserToken = async (req:Request , res:Response , next:NextFunction) => {
    const JWT = "rohit@123";

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {

      const decoded = jwt.verify(token,JWT) as { id:string,email:string,name:string };
      req.user = decoded;

      next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
}