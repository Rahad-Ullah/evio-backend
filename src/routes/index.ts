import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { PatientRoutes } from '../app/modules/patient/patient.route';
import { DisclaimerRoutes } from '../app/modules/disclaimer/disclaimer.route';
import { SpecialtyRoutes } from '../app/modules/specialty/specialty.route';
import { DoctorRoutes } from '../app/modules/doctor/doctor.route';
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
    path: '/doctors',
    route: DoctorRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/disclaimer',
    route: DisclaimerRoutes,
  },
  {
    path: '/specialties',
    route: SpecialtyRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
