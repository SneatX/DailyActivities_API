import jwt from "jsonwebtoken"
import responseFormatter from '../utils/responseFormatter.js'

export default async function authJWT(req, res, next){
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(400).json(responseFormatter(400, 'Token missing or improperly formatted'))

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json(responseFormatter(401, `Invalid token: ${err.name}`))
        req.user = decoded
        next()
    })
}