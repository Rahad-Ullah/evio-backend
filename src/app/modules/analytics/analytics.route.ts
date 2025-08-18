import express from 'express';
import { AnalyticsController } from './analytics.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.get(
  '/overview',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  AnalyticsController.getOverview
);

export const AnalyticsRoutes = router;
