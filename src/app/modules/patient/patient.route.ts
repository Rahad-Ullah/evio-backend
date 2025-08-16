import express from 'express';
import { PatientController } from './patient.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(UserValidation.createUserZodSchema),
  PatientController.createPatient
); 

export const PatientRoutes = router;
