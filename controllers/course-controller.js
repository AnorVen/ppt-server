import { courseService } from '../service/course-service.js';

class CourseController {
	async addCourse(req, res, next) {
		try {
			const courseData = await courseService.addCourse(req.body);
			return res.json(courseData);
		}
		catch (e) {
			next(e);
		}
	}
	
	async getCourses(req, res, next) {
		try {
			const courses = await courseService.getAllCourses();
			return res.json(courses);
		}
		catch (e) {
			next(e);
		}
	}

	async updateCourse(req, res, next) {
		try {
			const course = await courseService.updateCourse(req.body);
			return res.json(course);
		}
		catch (e) {
			next(e);
		}
	}

	async getCourse(req, res, next) {
		try {
			if (req.body.id) {
				let course = await courseService.getCourse(req.body.id);

				return res.json(course);
			} else {
				next();
			}
		}
		catch (e) {
			next(e);
		}
	}

	async deleteCourse(req, res, next) {
		try {
			await courseService.deleteCourse(req.body.id);
			return res.status('200').json(`Курс удален`);
		}
		catch (e) {
			next(e);
		}
	}
}


export const courseController = new CourseController();
