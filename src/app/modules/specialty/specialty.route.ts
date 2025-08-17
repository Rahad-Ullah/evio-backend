import express from 'express';
import { SpecialtyController } from './specialty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SpecialtyValidations } from './specialty.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

// create specialty
router.post(
  '/create',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  fileUploadHandler(),
  validateRequest(SpecialtyValidations.createSpecialtyZodSchema),
  SpecialtyController.createSpecialty
);

// update specialty
router.patch(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  fileUploadHandler(),
  validateRequest(SpecialtyValidations.updateSpecialtyZodSchema),
  SpecialtyController.updateSpecialty
);

// delete specialty
router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  SpecialtyController.deleteSpecialty
);

// get all specialties
router.get('/', SpecialtyController.getAllSpecialties);

export const SpecialtyRoutes = router;
