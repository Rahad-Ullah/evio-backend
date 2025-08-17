import express from 'express';
import { MessageController } from './message.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { MessageValidations } from './message.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLES.PATIENT, USER_ROLES.DOCTOR),
  fileUploadHandler(),
  validateRequest(MessageValidations.createMessageZodSchema),
  MessageController.createMessage
); 

export const MessageRoutes = router;
