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
'64f6272316e2f1628874850b'
	getCourse = async (id) => {
		const course = await CourseModel.findById(id).exec();
		return course;
	};

	updateCourse = async (course) => {
		console.log(course.id);
		const newCourse = await CourseModel.findOneAndUpdate({ _id: course.id }, { ...course });
		console.log(newCourse);
		return newCourse;
	};

	deleteCourse = async (id) => {
		const finderCourse = await CourseModel.findByIdAndDelete(id).exec();
		return true
	};
}

export const courseService = new CourseService();
