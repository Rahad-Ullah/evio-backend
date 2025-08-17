import express from 'express';
import { ChatController } from './chat.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ChatValidations } from './chat.validation';

const router = express.Router();

// create chat
router.post(
  '/create',
  auth(USER_ROLES.PATIENT, USER_ROLES.DOCTOR),
  validateRequest(ChatValidations.createChatZodSchema),
  ChatController.createChat
); 

// delete chat
router.delete(
  '/:id',
  auth(USER_ROLES.PATIENT, USER_ROLES.DOCTOR),
  ChatController.deleteChat
);

export const ChatRoutes = router;
