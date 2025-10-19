import { Request, Response, Router } from 'express'
import { signupUser , loginUser } from '@/controller/user.controller';

const route = Router();

route.post('/signup', signupUser);
route.post('/login', loginUser);

const userRoute = route;
export default userRoute;