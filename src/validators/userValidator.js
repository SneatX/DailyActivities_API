import { body, query } from 'express-validator';

const logInValidation = [
    query().custom((value, { req }) => {
        if (Object.keys(req.query).length > 0) {
            throw new Error('Query parameters not allowed');
        }
        return true;
    }),

    body("email")
        .exists().withMessage("email is required in the body")
        .isEmail().withMessage("email must be a valid email"),

    body("password")
        .exists().withMessage("password is required")
        .isString().withMessage("password must be a string")
]

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


export default {
    logInValidation,
    emptyQueryAndBodyValidation
}
