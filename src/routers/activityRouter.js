import express from 'express';
import rateLimiter from '../middlewares/rateLimiter.js';
import authJWT from '../middlewares/authJWT.js'
import activityValidator from '../validators/activityValidator.js'
import ActivityController from '../controllers/activitiesController.js'

const router = express.Router();


//Private requests
router.get("/", authJWT, rateLimiter.getLimiter, activityValidator.emptyQueryAndBodyValidation, ActivityController.getAll)
router.get("/:id", authJWT, rateLimiter.getLimiter, activityValidator.idParamValidation, ActivityController.getById)
router.post("/", authJWT, rateLimiter.postLimiter, activityValidator.newActivityValidation, ActivityController.newActivity)

//Public requests

export default router