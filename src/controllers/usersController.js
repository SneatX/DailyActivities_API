import UsersModel from '../models/usersModel.js';
import { validationResult } from 'express-validator';

export default class UserController {

    static async logIn(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    }

    static async getAll(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        let userModel = new UsersModel()
        let users = await userModel.getAll()
        res.status(200).json(users)
    }
}

