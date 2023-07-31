import { CourseModel } from '../models/course-model.js';

class CourseService {
	addCourse = async (newCourse) => {
		const course = await CourseModel.create({ ...newCourse });
		return course;
	};

	getAllCourses = async () => {
		const courses = await CourseModel.find();
		return courses;
	};

	getCourse = async ({ id }) => {
		const course = await CourseModel.findById(id).exec();
		return course;
	};

	updateCourse = async (course) => {
		const newCourse = await CourseModel.findOneAndUpdate({ _id: course.id }, { ...course }, {
			new: true,
		});
		return newCourse;
	};

	deleteCourse = async (id) => {
		const finderCourse = await CourseModel.findByIdAndDelete(id).exec();

	};
}

export const courseService = new CourseService();
