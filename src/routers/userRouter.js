import express, { json } from 'express';
import UserController from '../controllers/usersController.js';
import rateLimiter from '../middlewares/rateLimiter.js';
import userValidator from '../validators/userValidator.js';

const router = express.Router();

router.get('/', rateLimiter.getLimiter, userValidator.emptyQueryAndBodyValidation, UserController.getAll)
router.post("/iniciarSesion", rateLimiter.getLimiter, userValidator.logInValidation, UserController.logIn)

export default router 