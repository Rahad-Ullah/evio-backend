import express from 'express';
import { SpecialtyController } from './specialty.controller';

const router = express.Router();

router.get('/', SpecialtyController); 

export const SpecialtyRoutes = router;
