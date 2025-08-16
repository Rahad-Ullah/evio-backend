import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { PatientRoutes } from '../app/modules/patient/patient.route';
import { DisclaimerRoutes } from '../app/modules/disclaimer/disclaimer.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/patients',
    route: PatientRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/disclaimer',
    route: DisclaimerRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
