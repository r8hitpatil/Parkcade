import { updateTime,deleteSlot, addSlot, getSlots, getTimeSlot } from '@/controller/time.controller';
import { verifyAccess } from '@/middleware/access.middleware';
import { verifyUserToken } from '@/middleware/auth.middleware';

import { Router } from 'express';
const route = Router();

route.put('/:id/:timeId/update-time',verifyUserToken,verifyAccess,updateTime);
route.delete('/:id/:timeId/delete-slot',verifyUserToken,verifyAccess,deleteSlot);
route.post('/:id/add-slot',verifyUserToken,verifyAccess,addSlot);
route.get('/:id/get-slot',verifyUserToken,getTimeSlot);

const timeRoutes = route;

export default timeRoutes;