import {Router}  from 'express';

import { body } from 'express-validator';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import{ userController } from '../controllers/user-controller.js';
import { bd } from '../database/index.js';
import { userService } from '../service/user-service.js';
import user from './user.js';
const router = new Router();

router.all('/', (req, res, next)=>{
	res.status(200).json(`router/`)
})

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/refresh', userController.refresh);
router.post('/registration', userController.addUser);

export default router