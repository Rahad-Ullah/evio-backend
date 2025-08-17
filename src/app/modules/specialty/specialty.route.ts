import express from 'express';
import { SpecialtyController } from './specialty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SpecialtyValidations } from './specialty.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.post(
  '/create',
  fileUploadHandler(),
  validateRequest(SpecialtyValidations.createSpecialtyZodSchema),
  SpecialtyController.createSpecialty
); 

export const SpecialtyRoutes = router;
