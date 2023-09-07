import { cityService } from '../service/city-service.js';

class CityController {
	async addCity(req, res, next) {
		try {
			const cityData = await cityService.addCity(req.body);
			return res.json({
				success: true, payload: cityData, errors: false,
			});
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}

	async getCities(req, res, next) {
		try {
			const citys = await cityService.getAllCities();
			return res.json({
				success: true, payload: citys, errors: false,
			});
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}

	async updateCity(req, res, next) {
		try {
			const city = await cityService.updateCity(req.body);
			return res.json(
				{ success: true, payload: city, errors: false },
			);
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}

	async getCity(req, res, next) {
		try {
			if (req.body.id) {
				console.log('req.body.id', req.body.id);
				let city = await cityService.getCity(req.body.id);

				return res.json(
					{ success: true, payload: city, errors: false },
				);
			} else {
				return res.status(200).json(`Город отсутствует`);
			}
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}

	async deleteCity(req, res, next) {
		try {
			await cityService.deleteCity(req.body.id);
			return res.status(200).json(`Город удален`);
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}
}


export const cityController = new CityController();
