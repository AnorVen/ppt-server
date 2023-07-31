import {Router}  from 'express';

import{ centerController } from '../controllers/center-controller.js';
const router = new Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	console.log('center', req.body);
	next();
});

// TODO router.post('/centers', authMiddleware, centerController.getCenters);
router.post('/add', centerController.addCenter);
router.post('/list',  centerController.getCenters);
router.post('/update',  centerController.updateCenter);
router.post('/delete',  centerController.deleteCenter);
router.post('/get',  centerController.getCenter);

export default router