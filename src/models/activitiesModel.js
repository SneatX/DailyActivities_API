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

    async getById(id) {
        try {
            const [[activity]] = await pool.query(`SELECT * FROM activities WHERE id = "${id}"`);
            return activity;
        } catch (error) {
            console.log(error);
        }
    }
    async insert(activity){
        try {
            await pool.query(`INSERT INTO activities (user_fk, title, description, state, priority, creation_date, update_date) VALUES ("${activity.user_fk}", "${activity.title}", "${activity.description}", "${activity.state}", "${activity.priority}", "${activity.creation_date}", "${activity.update_date}")`);
            return {
                success: true,
                message: "Activity created successfully"
            };
        } catch (error)  {
            return error.code.includes("ER_NO_REFERENCED") ?  { success: false, message: "user_fk not found in users table" } : { success: false, message: error.message };
          }
    }
}