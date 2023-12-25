import { model, Schema } from 'mongoose';

const SeminarSchema = new Schema({
	title: { type: String },
	description: { type: String },
	dates: [String],
	type: { type: String, required: true },
	type_of_work: { type: String },
	count: { type: String },
	organizer: { type: String },
	organizer_contacts: { type: String },
	organizer_center: { type: String },
	main_trainer: { type: String, required: true },
	city: { type: String, required: false },
	modules: [{
		trainer: String,
		dates: [String],
		count: String,
		them: String,
		city: String,
		description: String,
	}],
});

export const SeminarModel = model('Seminar', SeminarSchema, 'seminar');
