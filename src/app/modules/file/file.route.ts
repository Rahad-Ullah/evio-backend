import express from 'express';
import { FileController } from './file.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { FileValidations } from './file.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLES.PATIENT),
  fileUploadHandler(),
  validateRequest(FileValidations.createFileZodSchema),
  FileController.createFile
); 

export const FileRoutes = router;
