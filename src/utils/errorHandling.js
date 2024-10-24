import responseFormatter from './responseFormatter.js'

const jsonParseErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json(responseFormatter(400, "Invalid JSON in request body"));
    }
    next();
}

export default jsonParseErrorHandler