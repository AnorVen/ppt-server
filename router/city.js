import {Router}  from 'express';

import{ cityController } from '../controllers/city-controller.js';
const router = new Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	console.log('center', req.body);
	next();
});

router.post('/add', cityController.addCity);
router.post('/list',  cityController.getCities);
router.post('/update',  cityController.updateCity);
router.post('/delete',  cityController.deleteCity);
router.post('/get',  cityController.getCity);

export default router