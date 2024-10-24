import UsersModel from '../models/usersModel.js';

const userController = {
    async getAll(req, res) {
        let userModel = new UsersModel()
        let users = await userModel.getAll()
        res.status(200).json(users)
    }
}

export default userController
