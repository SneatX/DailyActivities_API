import express from 'express';
import UserController from '../controllers/usersController.js';
import rateLimiter from '../middlewares/rateLimiter.js';
import userValidator from '../validators/userValidator.js';

const router = express.Router();

router.get('/', rateLimiter.getLimiter, userValidator.emptyQueryAndBodyValidation, UserController.getAll)

export default router 