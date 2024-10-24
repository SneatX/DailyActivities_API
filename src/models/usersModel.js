import pool from '../config/db.js';

export default class UsersModel {
    async getAll() {
        try {
            const [users] = await pool.query('SELECT * FROM usuarios');
            return users;
        } catch (error) {
            console.log(error);
        }
    }
}