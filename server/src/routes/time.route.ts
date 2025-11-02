import { updateTime,deleteSlot } from '@/controller/time.controller';
import { verifyAccess } from '@/middleware/access.middleware';
import { verifyUserToken } from '@/middleware/auth.middleware';

import { Router } from 'express';
const route = Router();

route.put('/:id/:timeId/update-time',verifyUserToken,verifyAccess,updateTime);
route.delete('/:id/:timeId/delete-slot',verifyUserToken,verifyAccess,deleteSlot);

const timeRoutes = route;

export default timeRoutes;