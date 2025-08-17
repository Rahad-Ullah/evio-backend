import express from 'express';
import { PackageController } from './package.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { PackageValidations } from './package.validation';

const router = express.Router();

// create package
router.post(
  '/create',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  validateRequest(PackageValidations.createPackageZodSchema),
  PackageController.createPackage
);

// update package
router.patch(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  validateRequest(PackageValidations.updatePackageZodSchema),
  PackageController.updatePackage
);

export const PackageRoutes = router;
