import {Router}  from 'express';

import { body } from 'express-validator';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import{ userController } from '../controllers/user-controller.js';
const router = new Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	console.log('userController', req.body);
	next();
});

// TODO router.post('/users', authMiddleware, userController.getUsers);
router.post('/add',
	body('email').isEmail(),
	body('password').isLength({min: 3, max: 32}),
	userController.addUser
);
router.post('/list',  userController.getUsers);
router.post('/update',  userController.updateUser);
router.post('/update.list',  userController.updateUsers);
router.post('/delete',  userController.deleteUser);
router.post('/get',  userController.getUser);

export default router