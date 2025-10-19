import { createCoords, deleteLoc, getAllLocations, getLocations, roleEdit, updateCoords } from '@/controller/coord.controller';
import { verifyUserToken } from '@/middleware/auth.middleware';

import Router from 'express';

const route = Router();

route.post('/location',verifyUserToken,createCoords);
route.get('/locations',verifyUserToken,getLocations);
route.get('/all-locations',verifyUserToken,getAllLocations);
route.post('/update-location',verifyUserToken,updateCoords);
route.post('/delete-location',verifyUserToken,deleteLoc);
route.post('/access',verifyUserToken,roleEdit);

const mapRoutes = route;

export default mapRoutes;