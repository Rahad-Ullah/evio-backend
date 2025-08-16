import express from 'express';
import { PatientController } from './patient.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { PatientValidations } from './patient.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create',
  validateRequest(UserValidation.createUserZodSchema),
  PatientController.createPatient
);

router.patch(
  '/update',
  auth(USER_ROLES.PATIENT),
  validateRequest(PatientValidations.patientSchema),
  PatientController.updatePatient
);

export const PatientRoutes = router;
