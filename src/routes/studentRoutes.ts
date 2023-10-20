import express from 'express';
import { jwtAuth } from '../middleware/auth-middleware';
import { updateTaskStatus, viewTasks } from '../controllers/studentController';
const router = express.Router();

router.get('/view-tasks', jwtAuth , viewTasks);
router.get('/update-task-status/:id', jwtAuth , updateTaskStatus);
export default router;