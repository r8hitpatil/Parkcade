import { createCoords, deleteLoc, getAllLocations, getLocations, removeEditorAccess, roleEdit, updateCoords } from '@/controller/loc.controller';
import { verifyAccess, verifyOwnerAccess } from '@/middleware/access.middleware';
import { verifyUserToken } from '@/middleware/auth.middleware';

import Router from 'express';

const route = Router();

route.post('/location',verifyUserToken,createCoords);
route.get('/locations',verifyUserToken,getLocations);
route.get('/all-locations',verifyUserToken,getAllLocations);
route.put('/:id/update-location',verifyUserToken,verifyAccess,updateCoords);
route.delete('/:id/delete-location',verifyUserToken,verifyAccess,deleteLoc);
route.post('/:id/access',verifyUserToken,verifyOwnerAccess,roleEdit);
route.post('/:id/remove-access',verifyUserToken,verifyOwnerAccess,removeEditorAccess);

const mapRoutes = route;

export default mapRoutes;