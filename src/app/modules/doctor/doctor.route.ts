import express from 'express';
import { DoctorController } from './doctor.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { DoctorValidations } from './doctor.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

// create doctor
router.post(
  '/create',
  validateRequest(UserValidation.createUserZodSchema),
  DoctorController.createDoctor
);

// update doctor
router.patch(
  '/update',
  auth(USER_ROLES.DOCTOR),
  fileUploadHandler(),
  validateRequest(DoctorValidations.doctorZodSchema),
  DoctorController.updateDoctor
);

// get doctor by id
router.get('/:id', auth(), DoctorController.getDoctorById);

// get all doctors
router.get('/', auth(), DoctorController.getAllDoctors);

export const DoctorRoutes = router;
