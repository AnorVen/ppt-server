import { SeminarModel } from '../models/seminar-model.js';
import { ApiError } from '../exceptions/api-error.js';

class SeminarService {
	async addSeminar(newSeminar) {
		const seminar = await SeminarModel.create({...newSeminar});
		return seminar
	}
	
	async getAllSeminars() {
		const seminars = await SeminarModel.find();
		return seminars;
	}

	async getSeminar(id) {
		const seminar = await SeminarModel.findById(id).exec();
		return seminar;
	}

	updateSeminar = async (seminar) =>{
		const newSeminar = await SeminarModel.findOneAndUpdate({_id: seminar._id}, {...seminar}, {
			new: true
		});
		return newSeminar;
	}

	deleteSeminar = async (id) =>{
		return await SeminarModel.findByIdAndDelete(id);

	}
}

export const seminarService = new SeminarService();
