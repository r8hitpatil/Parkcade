import "module-alias/register"
import express from 'express';
import userRoutes from '@routes/user.route'
import { PrismaClient } from "@prisma/client";
import cookieParser from 'cookie-parser';
import mapRoutes from "@routes/map.route";
import dotenv from  'dotenv';

dotenv.config();
const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());
app.use('/test',userRoutes);
app.use('/tester',mapRoutes)

export default app;