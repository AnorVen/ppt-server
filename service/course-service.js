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

	getCourse = async (id) => {
		const course = await CourseModel.findById(id).exec();
		return course;
	};

	updateCourse = async (course) => {
		console.log('course.id', course._id);
		const newCourse = await CourseModel.findOneAndUpdate({ _id: course._id }, { ...course });
		return newCourse;
	};

	deleteCourse = async (id) => {
		console.log('deleteCourse', id);
		return CourseModel.findByIdAndDelete(id).exec();
	};
}

export const courseService = new CourseService();
