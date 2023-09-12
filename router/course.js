import {Router}  from 'express';

import{ courseController } from '../controllers/course-controller.js';
const router = new Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// TODO router.post('/courses', authMiddleware, courseController.getCourses);
router.post('/add', courseController.addCourse);
router.post('/list',  courseController.getCourses);
router.post('/update',  courseController.updateCourse);
router.post('/delete',  courseController.deleteCourse);
router.post('/get',  courseController.getCourse);

export default router