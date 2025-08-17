import express from 'express';
import { DoctorController } from './doctor.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(UserValidation.createUserZodSchema),
  DoctorController.createDoctor
); 

export const DoctorRoutes = router;
