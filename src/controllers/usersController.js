import { validationResult } from 'express-validator';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import UsersModel from '../models/usersModel.js';
import responseFormatter from '../utils/responseFormatter.js'
import hashPassword from '../utils/hashPassword.js'

export default class UserController {
    static async logIn(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        let userModel = new UsersModel()
        const user = await userModel.getByEmail(req.body.email)
        if (!user) return res.status(404).json(responseFormatter(404, "Email not found"))

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(401).json(responseFormatter(401, "Incorrect password"))

        let actualDate = new Date()
        const token = jwt.sign({
            id: user.id,
            name: user.username,
            email: user.email,
            login_date_and_time: actualDate
        }, process.env.JWT_SECRET,
            { expiresIn: '30min' }
        )

        // Update last login
        const fechaFormateada = actualDate.toISOString().slice(0, 19).replace('T', ' ');
        await userModel.updateLastLogin(user.id, fechaFormateada)

        return res.status(200).json(responseFormatter(200, "Success", token))
    }

    static async validateSession(req, res) {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(400).json(responseFormatter(400, 'Token missing or improperly formatted'))
    
        const token = authHeader.split(' ')[1]

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
        res.status(200).json(responseFormatter(200, "Success", users))
    }

    static async getById(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        let userModel = new UsersModel()
        let user = await userModel.getById(req.params.id)
        if (!user) return res.status(404).json(responseFormatter(404, "User not found"))

        res.status(200).json(responseFormatter(200, "Success", user))
    }

    static async updateById(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        let userModel = new UsersModel()
        let user = await userModel.getById(req.params.id)
        if (!user) return res.status(404).json(responseFormatter(404, "User not found"))

        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        req.body.password ? user.password = await hashPassword(req.body.password) : user.password
        
        await userModel.updateById(req.params.id, user)
        res.status(200).json(responseFormatter(200, "Data updated successfully", user))
    }

    static async changeStatusToInactive(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        let userModel = new UsersModel()
        let user = await userModel.getById(req.params.id)
        if (!user) return res.status(404).json(responseFormatter(404, "User not found"))

        await userModel.changeStatus(req.params.id, "inactive")
        user.status = "inactive"
        res.status(200).json(responseFormatter(200, "User status changed to inactive", user))
    }

}

