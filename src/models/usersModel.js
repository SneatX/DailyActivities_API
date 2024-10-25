import pool from '../config/db.js';

export default class UsersModel {

    async getById(id) {
        try {
            const [[user]] = await pool.query(`SELECT * FROM users WHERE id = "${id}"`);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async getByEmail(email) {
        try {
            const [[user]] = await pool.query(`SELECT * FROM users WHERE email = "${email}"`);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const [users] = await pool.query('SELECT * FROM users');
            return users;
        } catch (error) {
            console.log(error);
        }
    }
}