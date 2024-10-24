import pool from '../config/db.js';

export default class UsersModel {
    async getAll() {
        const [users] = await pool.query('SELECT * FROM usuarios');
        console.log(users);
        return users;
    }
}