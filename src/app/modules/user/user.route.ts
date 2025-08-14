import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { USER_ROLES } from './user.constant';
const router = express.Router();

router
  .route('/profile')
  .get(auth(), UserController.getUserProfile)
  .patch(
    auth(),
    fileUploadHandler(),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateProfile
  );

router.post(
  '/create-admin',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
