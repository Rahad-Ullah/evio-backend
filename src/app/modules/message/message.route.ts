import express from 'express';
import { MessageController } from './message.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { MessageValidations } from './message.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

// create message
router.post(
  '/create',
  auth(USER_ROLES.PATIENT, USER_ROLES.DOCTOR),
  fileUploadHandler(),
  validateRequest(MessageValidations.createMessageZodSchema),
  MessageController.createMessage
); 

// get chat messages
router.get(
  '/:id',
  auth(USER_ROLES.PATIENT, USER_ROLES.DOCTOR),
  MessageController.getChatMessages
);

export const MessageRoutes = router;
