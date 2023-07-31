import {Router}  from 'express';

import{ seminarController } from '../controllers/seminar-controller.js';
const router = new Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	console.log('seminar', req.body);
	next();
});

// TODO router.post('/seminars', authMiddleware, seminarController.getSeminars);
router.post('/add',
	seminarController.addSeminar
);
router.post('/list',  seminarController.getSeminars);
router.post('/update',  seminarController.updateSeminar);
router.post('/delete',  seminarController.deleteSeminar);
router.post('/get',  seminarController.getSeminar);

export default router