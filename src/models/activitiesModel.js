import pool from '../config/db.js';

export default class ActivitiesModel {
    async getAll() {
        try {
            const [activities] = await pool.query('SELECT * FROM activities');
            return activities;
        } catch (error) {
            console.log(error);
        }
    }
}