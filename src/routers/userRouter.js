import express from 'express';
import userController from '../controllers/usersController.js';
import rateLimiter from '../middlewares/rateLimiter.js';

const router = express.Router();

router.get('/', rateLimiter.getLimiter, userController.getAll)

export default router 