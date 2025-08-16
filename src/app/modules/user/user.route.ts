import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { USER_ROLES } from './user.constant';
import { AuthValidation } from '../auth/auth.validation';
const router = express.Router();

router
  .route('/profile')
  .get(auth(), UserController.getUserProfile)
  .patch(
    auth(),
    fileUploadHandler(),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateProfile
  )
  .delete(auth(), UserController.deleteUserProfile);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createAdmin
);

router.get('/:id', auth(), UserController.getUserById);

// delete user by id
router.delete(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  UserController.deleteUserById
);

// delete user by email
router.delete(
  '/delete-account',
  validateRequest(AuthValidation.createLoginZodSchema),
  UserController.deleteUserByEmail
);

export const UserRoutes = router;
