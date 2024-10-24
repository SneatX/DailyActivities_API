import rateLimit from 'express-rate-limit';
import responseFormatter from '../utils/responseFormatter.js';

const loginLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 3,
    message: 'Espera 3 minutos antes de volver a intentarlo'
});

const getLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 25,
    message: responseFormatter(429, 'Taza superada')
});

const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 45,
    message: responseFormatter(429, 'Taza superada')
});

const deleteLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10,
    message: responseFormatter(429, 'Taza superada')
});

const putLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 45,
    message: responseFormatter(429, 'Taza superada')
});

export default {
    loginLimiter,
    getLimiter,
    postLimiter,
    deleteLimiter,
    putLimiter
}