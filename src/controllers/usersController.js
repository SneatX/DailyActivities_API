import UsersModel from '../models/usersModel.js';
import { validationResult } from 'express-validator';

import responseFormatter from '../utils/responseFormatter.js'

export default class UserController {
    static async logIn(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));
    
        let userModel = new UsersModel()
    }

    static async getAll(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        let userModel = new UsersModel()
        let users = await userModel.getAll()
        res.status(200).json(users)
    }
}

