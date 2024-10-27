import express from 'express';
import UserController from '../controllers/usersController.js';
import rateLimiter from '../middlewares/rateLimiter.js';
import userValidator from '../validators/userValidator.js'
import authJWT from '../middlewares/authJWT.js'

const router = express.Router();

//Private requests
router.get('/', authJWT, rateLimiter.getLimiter, userValidator.emptyQueryAndBodyValidation, UserController.getAll)
router.get('/:id', authJWT, rateLimiter.getLimiter, userValidator.idParamValidation, UserController.getById)
router.put('/:id', authJWT, rateLimiter.putLimiter, userValidator.updateUserByIdValidation, UserController.updateById)
router.delete('/:id', authJWT, rateLimiter.deleteLimiter, userValidator.idParamValidation, UserController.changeStatusToInactive)

//Public requests
router.post("/login", rateLimiter.loginLimiter, userValidator.logInValidation, UserController.logIn)
router.post("/validatesession", rateLimiter.postLimiter, UserController.validateSession)

export default router 