import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { PatientRoutes } from '../app/modules/patient/patient.route';
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
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
