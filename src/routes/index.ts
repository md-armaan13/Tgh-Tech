import express from 'express';
import adminRouter from './adminRoutes';
import studentRouter from './studentRoutes';
import authRouter from './authRoutes';
const router = express.Router();

router.use('/admin',adminRouter);
router.use('/student',studentRouter);
router.use('/auth',authRouter);
router.get('/', (req, res) => {
  res.send('Hello World!!!');
});

export default router;