import { body, query, param } from 'express-validator';

const emptyQueryAndBodyValidation = [
    query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
            throw new Error('Query parameters not allowed');
        }
        return true;
    }),
    body().custom((value, { req }) => {
        if (Object.keys(req.body).length > 0) {
            throw new Error('Body parameters not allowed');
        }
        return true;
    }),
]

const newActivityValidation = [
    body("user_fk")
        .exists().withMessage("user_fk is required in the body")
        .isString().withMessage("name must be a string"),

    body("title")
        .exists().withMessage("title is required in the body")
        .isString().withMessage("title must be a string"),
    
    body("description")
        .exists().withMessage("description is required in the body")
        .isString().withMessage("description must be a string"),
    body("state")
        .exists().withMessage("state is required in the body")
        .isString().withMessage("state must be a string")
        .isIn(['pending', 'completed', 'in progress']).withMessage("state must be one of: pending, completed, or in progress"),
    body("priority")
        .exists().withMessage("priority is required in the body")
        .isString().withMessage("priority must be a string")
        .isIn(['low', 'medium', 'high']).withMessage("state must be one of: low, medium, or high"),
]

const idParamValidation = [
    param("id")
        .exists()
        .withMessage("id is required in the body"),

    body().custom((value, { req }) => {
        if (Object.keys(req.body).length > 0) {
            throw new Error('Body parameters not allowed');
        }
        return true;
    }),
]

export default {
    emptyQueryAndBodyValidation,
    newActivityValidation,
    idParamValidation
}