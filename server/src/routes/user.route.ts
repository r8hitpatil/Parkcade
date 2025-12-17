import { Request, Response, Router } from 'express'
import { signupUser , loginUser, logoutUser, verifyToken } from '@/controller/user.controller';

const route = Router();

route.post('/signup', signupUser);
route.post('/login', loginUser);
route.post('/logout',logoutUser);
route.get('/me',verifyToken,(req,res) => {
    res.json({ user : req.user })
})

const userRoute = route;
export default userRoute;