import { seminarService } from '../service/seminar-service.js';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-error.js';

class SeminarController{
	async addSeminar(req, res, next) {
		try {
			const seminarData = await seminarService.addSeminar(req.body);
			return res.json({ success: true, payload: seminarData, errors: false });
		}
		catch (e) {
			next(e);
		}
	}
	
	async getSeminars(req, res, next) {
		try {
			const seminars = await seminarService.getAllSeminars();
			return res.json({ success: true, payload: seminars, errors: false });
		}
		catch (e) {
			next(e);
		}
	}

	async updateSeminar(req, res, next) {
		try {
			const seminar = await seminarService.updateSeminar(req.body);
			return res.json({ success: true, payload: seminar, errors: false });
		}
		catch (e) {
			next(e);
		}
	}

	async getSeminar(req, res, next) {
		try {
			if (req.body._id) {
				let seminar = await seminarService.getSeminar(req.body._id);
				return res.json({ success: true, payload: seminar, errors: false });
			} else {
				next();
			}
		}
		catch (e) {
			next(e);
		}
	}

	async deleteSeminar(req, res, next) {
		try {
			await seminarService.deleteSeminar(req.body._id);
			return res.status(200).json(`Семинар ${req.body.surname} ${req.body.name} удален`);
		}
		catch (e) {
			next(e);
		}
	}
}


export const seminarController = new SeminarController();
