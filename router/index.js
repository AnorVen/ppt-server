import {Router}  from 'express';

import { body } from 'express-validator';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import{ userController } from '../controllers/user-controller.js';
import { bd } from '../database/index.js';
import { userService } from '../service/user-service.js';
import user from './user.js';
const router = new Router();

router.all('/', (req, res, next)=>{
	console.log('req', req);
	console.log(123123);
	res.status(200).json(`AWF, ${JSON.stringify(req)}`)
})

router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router