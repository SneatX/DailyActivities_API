const jsonParseErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            message: 'Invalid JSON format. Please check the data and try again.'
        });
    }
    next();
}

export default jsonParseErrorHandler