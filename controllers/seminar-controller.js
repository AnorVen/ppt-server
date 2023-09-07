import { seminarService } from '../service/seminar-service.js';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-error.js';

class SeminarController{
	async addSeminar(req, res, next) {
		try {
			const seminarData = await seminarService.addSeminar(req.body);
			return res.json(seminarData);
		}
		catch (e) {
			next(e);
		}
	}
	
	async getSeminars(req, res, next) {
		try {
			const seminars = await seminarService.getAllSeminars();
			return res.json(seminars);
		}
		catch (e) {
			next(e);
		}
	}

	async updateSeminar(req, res, next) {
		try {
			const seminar = await seminarService.updateSeminar(req.body);
			return res.json(seminar);
		}
		catch (e) {
			next(e);
		}
	}

	async getSeminar(req, res, next) {
		try {
			if (req.body.id) {
				let seminar = await seminarService.getSeminar(req.body.id);

				return res.json(seminar);
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
			await seminarService.deleteSeminar(req.body.id);
			return res.status(200).json(`Семинар ${req.body.surname} ${req.body.name} удален`);
		}
		catch (e) {
			next(e);
		}
	}
}


export const seminarController = new SeminarController();
