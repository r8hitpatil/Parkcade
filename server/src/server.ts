import "module-alias/register"
import express from 'express';
import userRoutes from '@routes/user.route'
import { PrismaClient } from "@prisma/client";
import cookieParser from 'cookie-parser';
import mapRoutes from "@routes/map.route";
import dotenv from  'dotenv';
import cors from 'cors';
import timeRoutes from "./routes/time.route";

dotenv.config();
const app = express();
export const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/user',userRoutes);
app.use('/loc',mapRoutes);
app.use('/time',timeRoutes);

export default app;