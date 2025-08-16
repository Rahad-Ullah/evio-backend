import express from 'express';
import { DisclaimerController } from './disclaimer.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { DisclaimerValidations } from './disclaimer.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  validateRequest(DisclaimerValidations.disclaimerZodSchema),
  DisclaimerController.createUpdateDisclaimer
); 

router.get('/:type', DisclaimerController.getDisclaimer);

export const DisclaimerRoutes = router;
