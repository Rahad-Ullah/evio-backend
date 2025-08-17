import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { PatientRoutes } from '../app/modules/patient/patient.route';
import { DisclaimerRoutes } from '../app/modules/disclaimer/disclaimer.route';
import { SpecialtyRoutes } from '../app/modules/specialty/specialty.route';
import { DoctorRoutes } from '../app/modules/doctor/doctor.route';
import { PackageRoutes } from '../app/modules/package/package.route';
import { ContactRoutes } from '../app/modules/contact/contact.route';
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
  {
    path: '/packages',
    route: PackageRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
