import express from 'express';
import { SubscriptionController } from './subscription.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { SubscriptionValidations } from './subscription.validation';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLES.PATIENT),
  validateRequest(SubscriptionValidations.subscriptionZodSchema),
  SubscriptionController.createSubscription
); 

export const SubscriptionRoutes = router;
