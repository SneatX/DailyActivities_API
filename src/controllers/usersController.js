import { validationResult } from 'express-validator';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import UsersModel from '../models/usersModel.js';
import responseFormatter from '../utils/responseFormatter.js'

export default class UserController {
    static async logIn(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        let userModel = new UsersModel()
        const user = await userModel.getByEmail(req.body.email)
        if (!user) return res.status(404).json(responseFormatter(404, "Email not found"))

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(401).json(responseFormatter(401, "Incorrect password"))

        
        const token = jwt.sign({
            id: user.id,
            name: user.username,
            email: user.email,
            login_date_and_time: new Date()
        }, process.env.JWT_SECRET,
            { expiresIn: '30min' }
        )

        res.status(200).json(responseFormatter(200, "Success", token))
    }

    static async validateSession(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json(responseFormatter(401, `Invalid token: ${err.name}`))
            res.status(200).json(responseFormatter(200, "Success", decoded))
        })
    }

    static async getAll(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        let userModel = new UsersModel()
        let users = await userModel.getAll()
        res.status(200).json(users)
    }
}

