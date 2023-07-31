import { Schema, model } from 'mongoose';

const CourseSchema = new Schema({
	type: { type: String, required: true },
	main_trainer: { type: String, required: true },
	city: { type: String, required: true },
	title: { type: String },
	organizer: { type: String, required: true },
	organizer_contacts: { type: String, required: true },
	description: { type: String },
	modules: [{
		module_number: String,
		trainer: String,
		dates: [String],
		count: String,
		them: String,
	}],
});

export const CourseModel = model('Course', CourseSchema, 'courses');
