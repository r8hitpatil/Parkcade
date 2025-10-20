import { RequestHandler } from "express";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { prisma } from "@/server";
import jwt from 'jsonwebtoken'
import parsedEnv from "@/utils/env";

const salt = genSaltSync(10);

export const signupUser:RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.status(400).json({ message : "Enter complete details" });
    }
    const hash:string = hashSync(password, salt);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    if(!newUser){
        return res.status(401).json({ message : "Failed to create user" });
    }
    return res.status(201).json({ message : "User created", data: newUser });
  } catch (error: unknown) {
    console.error('Error',error);
    return res.status(500).json({ msg : "Internal server error" });
  }
};

export const loginUser:RequestHandler = async (req ,res) => {
  try {
    const { email,password } = req.body;
    if(!email || !password){
      return res.status(400).json({ message : "Enter complete credentials" });
    }
    const checkUser = await prisma.user.findUnique({
        where : {
          email,
        }
    })
    if(!checkUser){
      return res.status(401).json({ message : "User not found" });
    }
    const passwordMatch = compareSync(password,checkUser.password);
    if(!passwordMatch){
      return res.status(401).json({ message : "Invalid credentials" });
    }
    const { id,name } = checkUser;
    const jwtSign = jwt.sign({
      id:id,
      email:email
    },
      parsedEnv.TOKEN_KEY//use meta.env
    ,{
      expiresIn : "1h"
    })
    res.cookie('token',jwtSign,{ httpOnly : true })
    return res.status(200).json({ message : "Login successful", user : { id,name,email }});
  } catch (error) {
    console.error('Error',error);
    return res.status(500).json({ msg : "Internal server error" });
  }
}