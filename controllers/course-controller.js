import { courseService } from '../service/course-service.js';

class CourseController {
	async addCourse(req, res, next) {
		try {
			const courseData = await courseService.addCourse(req.body);
			return res.json({
				success: true, payload: courseData, errors: false,
			});
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}

	async getCourses(req, res, next) {
		try {
			const courses = await courseService.getAllCourses();
			return res.json({
				success: true, payload: courses, errors: false,
			});
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}

	async updateCourse(req, res, next) {
		try {
			const course = await courseService.updateCourse(req.body);
			return res.json(
				{ success: true, payload: course, errors: false },
			);
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}

	async getCourse(req, res, next) {
		try {
			if (req.body._id) {
				console.log('req.body.id', req.body._id);
				let course = await courseService.getCourse(req.body._id);

				return res.json(
					{ success: true, payload: course, errors: false },
				);
			} else {
				return res.status(200).json(`Курс отсутствует`);
			}
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}

	async deleteCourse(req, res, next) {
		try {
			await courseService.deleteCourse(req.body._id);
			return res.status(200).json(`Курс удален`);
		}
		catch (e) {
			return res.json({
				success: false, payload: [], errors: e,
			});
		}
	}
}


export const courseController = new CourseController();
