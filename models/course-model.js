import { model, Schema } from 'mongoose';

const CourseSchema = new Schema({
	type: { type: String, required: true },
	main_trainer: { type: String, required: true },
	city: { type: String },
	title: { type: String },
	organizer: { type: String },
	organizer_contacts: { type: String },
	description: { type: String },
	modules: [{
		module_number: String,
		trainer: String,
		dates: [String],
		count: String,
		them: String,
		description: String ,
	}],
});

export const CourseModel = model('Course', CourseSchema, 'courses');
