import express from 'express';
import { FileController } from './file.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { FileValidations } from './file.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

// create file
router.post(
  '/create',
  auth(USER_ROLES.PATIENT),
  fileUploadHandler(),
  validateRequest(FileValidations.createFileZodSchema),
  FileController.createFile
); 

// update file
router.patch(
  '/:id',
  auth(USER_ROLES.PATIENT),
  fileUploadHandler(),
  validateRequest(FileValidations.updateFileZodSchema),
  FileController.updateFile
);

export const FileRoutes = router;
