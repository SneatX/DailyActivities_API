import UsersModel from './src/models/usersModel.js';
process.loadEnvFile()

const usersModel = new UsersModel();
usersModel.getAll()