import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { thoughtRouter } from "./thoughtRoutes.js";
// import { reactionRouter } from './reactionRoutes';

const router = Router();

router.use("/users", userRouter);
router.use("/thoughts", thoughtRouter);
// router.use('/reactions', reactionRouter);

export default router;
