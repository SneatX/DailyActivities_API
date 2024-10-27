import express from 'express';
import userRouter from './userRouter.js'
import activityRouter from './activityRouter.js'

const router = express.Router();

router.use('/users', userRouter)
router.use('/activities', activityRouter)

export default router 