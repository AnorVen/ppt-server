import { ApiError } from '../exceptions/api-error.js';
import { CityModel } from '../models/city-model.js';

class CityService {
	addCity = async (city) => {
		const name = city.name.toLowerCase()
		const checkCity = await CityModel.findOne({ name });
		if (checkCity){
			throw ApiError.BadRequest(`Такой город - ${name} уже существует`);
		}
		const newCity = await CityModel.create({ name });
		return newCity;
	};

	getAllCities = async () => {
		const cities = await CityModel.find();
		return cities;
	};

	getCity = async (id) => {
		console.log('id', id);
		const city = await CityModel.findById(id).exec();
		console.log('city', city);
		return city;
	};

	updateCity = async (city) => {
		const name = city.name.toLowerCase()
		const newCity = await CityModel.findOneAndUpdate({ _id: city._id }, { name });
		return newCity;
	};

	deleteCity = async (id) => {
		await CityModel.findByIdAndDelete(id).exec();
		return true
	};
}

export const cityService = new CityService();
