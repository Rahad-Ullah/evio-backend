import express from 'express';
import { FileController } from './file.controller';

const router = express.Router();

router.get('/', FileController); 

export const FileRoutes = router;
