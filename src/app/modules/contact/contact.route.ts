import express from 'express';
import { ContactController } from './contact.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ContactValidations } from './contact.validation';

const router = express.Router();

// create/update contact
router.post(
  '/',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  validateRequest(ContactValidations.contactZodSchema),
  ContactController.createUpdateContact
);

// get contact info
router.get('/', ContactController.getContactInfo);

export const ContactRoutes = router;
