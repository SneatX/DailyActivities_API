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

    async insert(user){
        try {
            await pool.query(`INSERT INTO users (username, email, password, status, creation_date, last_login) VALUES ("${user.username}", "${user.email}", "${user.password}", "${user.status}", "${user.creation_date}", "${user.last_login}")`);
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, user) {
        try {
           await pool.query(`UPDATE users SET username = "${user.username}", email = "${user.email}", password = "${user.password}" WHERE id = "${id}"`);
        } catch (error) {
            console.log(error);
        }
    }

    async updateLastLogin(id, lastLogin) {
        try {
            await pool.query(`UPDATE users SET last_login = "${lastLogin}" WHERE id = "${id}"`);
        } catch (error) {
            console.log(error);
        }
    }

    async changeStatus(id, newStatus) {
        try {
            await pool.query(`UPDATE users SET status = ? WHERE id = ?`, [newStatus, id]);
        } catch (error) {
            console.log(error);
        }
    }
}