import express from 'express';
const router = express.Router();

import {addStudent, assignTask} from '../controllers/adminController';
import { jwtAuth } from '../middleware/auth-middleware';

router.get('/', (req, res) => {
  res.send('Hello Admin!!!');
});

router.post('/add-student',jwtAuth, addStudent);
router.post('/assign-task',jwtAuth ,assignTask);
export default router;