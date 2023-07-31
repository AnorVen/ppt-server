import { CenterModel } from '../models/center-model.js';
import { ApiError } from '../exceptions/api-error.js';

class CenterService {
	async addCenter(newCenter) {
		console.log('newCenter', newCenter);
		const candidate = await CenterModel.findOne({ title: newCenter.title });
		if (candidate) {
			throw ApiError.BadRequest(`Центр с таким именем - ${newCenter.title} уже существует`);
		}
		const center = await CenterModel.create({...newCenter});
		return center
	}
	
	async getAllCenters() {
		const centers = await CenterModel.find();
		return centers;
	}

	async getCenter({id}) {
		const center = await CenterModel.findById(id).exec();
		return center;
	}

	updateCenter = async (center) =>{
		const newCenter = await CenterModel.findOneAndUpdate({_id: center.id}, {...center}, {
			new: true
		});
		return newCenter;
	}

	deleteCenter = async (id) =>{
		const finderCenter = await CenterModel.findByIdAndDelete(id).exec();

	}
}

export const centerService = new CenterService();
