import { Request, Response, Router } from 'express'
import { signupUser , loginUser, logoutUser } from '@/controller/user.controller';

const route = Router();

route.post('/signup', signupUser);
route.post('/login', loginUser);
route.post('/logout',logoutUser);

const userRoute = route;
export default userRoute;