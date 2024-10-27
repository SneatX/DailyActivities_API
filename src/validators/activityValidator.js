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

export default {
    emptyQueryAndBodyValidation
}