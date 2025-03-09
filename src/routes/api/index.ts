import { Router } from 'express';
import { userRouter } from './userRoutes';
import { thoughtRouter } from './thoughtRoutes';
// import { reactionRouter } from './reactionRoutes';

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);
// router.use('/reactions', reactionRouter);

export default router;