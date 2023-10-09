import { centerService } from '../service/center-service.js';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-error.js';

class CenterController {
	async addCenter(req, res, next) {
		try {
			const centerData = await centerService.addCenter(req.body);
			return res.json({ success: true, payload: centerData, errors: false });
		}
		catch (e) {
			next(e);
		}
	}
	
	async getCenters(req, res, next) {
		try {
			const centers = await centerService.getAllCenters();
			return res.json({ success: true, payload: centers, errors: false });
		}
		catch (e) {
			next(e);
		}
	}

	async updateCenter(req, res, next) {
		try {
			const center = await centerService.updateCenter(req.body);
			return res.json({ success: true, payload: center, errors: false });
		}
		catch (e) {
			next(e);
		}
	}

	async getCenter(req, res, next) {
		try {
			if (req.body._id) {
				let center = await centerService.getCenter(req.body._id);

				return res.json({ success: true, payload: center, errors: false });
			} else {
				next();
			}
		}
		catch (e) {
			next(e);
		}
	}

	async deleteCenter(req, res, next) {
		try {
			await centerService.deleteCenter(req.body._id);
			return res.status(200).json(`Центр ${req.body.title} удален`);
		}
		catch (e) {
			next(e);
		}
	}
}


export const centerController = new CenterController();
