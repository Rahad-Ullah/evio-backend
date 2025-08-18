import express from 'express';
import { NotificationController } from './notification.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), NotificationController.getMyNotification); 

export const NotificationRoutes = router;
