import { validationResult } from 'express-validator';
import ActivitiesModel from '../models/activitiesModel.js'
import responseFormatter from '../utils/responseFormatter.js'


export default class ActivityController {
    static async getAll(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        let activitiesModel = new ActivitiesModel()
        let activities = await activitiesModel.getAll()
        res.status(200).json(responseFormatter(200, "Success", activities))
    }

    static async newActivity(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(responseFormatter(400, errors.array()[0].msg));

        let activitiesModel = new ActivitiesModel()
        let actualDate = new Date()
        let activity = {
            user_fk: req.body.user_fk,
            title: req.body.title,
            description: req.body.description,
            state: req.body.state,
            priority: req.body.priority,
            creation_date: actualDate.toISOString().slice(0, 19).replace('T', ' '),
            update_date: actualDate.toISOString().slice(0, 19).replace('T', ' ')
        }

        let queryResponse = await activitiesModel.insert(activity)
        if(!queryResponse.success) return res.status(400).json(responseFormatter(400, queryResponse.message))
        
        res.status(200).json(responseFormatter(200, "Activity created successfully", activity))
    }
}