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
}