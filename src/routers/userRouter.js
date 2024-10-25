import express from 'express';
import UserController from '../controllers/usersController.js';
import rateLimiter from '../middlewares/rateLimiter.js';
import userValidator from '../validators/userValidator.js'
import authJWT from '../middlewares/authJWT.js'

const router = express.Router();

router.get('/', authJWT, rateLimiter.getLimiter, userValidator.emptyQueryAndBodyValidation, UserController.getAll)
router.get('/:id', authJWT, rateLimiter.getLimiter, userValidator.getUserByIdValidation, UserController.getById)
router.post("/login", rateLimiter.getLimiter, userValidator.logInValidation, UserController.logIn)
router.post("/validatesession", rateLimiter.getLimiter, UserController.validateSession)

export default router 