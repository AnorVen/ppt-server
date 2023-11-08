import {Router}  from 'express';
import sharp from 'sharp';

import { body } from 'express-validator';
import * as fs from 'fs';
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

router.post('/upload', async (req, res) => {
	const name = req.files.file.name.split('.')
	const id = req.body.user
	if (!fs.existsSync(`public/images/${id}`)) {
		fs.mkdir(`public/images/${id}`, err => {
			if(err) throw err; // не удалось создать папку
		});
	}
	await req.files.file.mv(`public/images/${id}/temp.${name[name.length - 1]}`);

	await sharp(`./public/images/${id}/temp.${name[name.length - 1]}`)
		.toFormat('jpeg')
		.jpeg()
		.resize(600, 600)
		.toFile(`./public/images/${id}/newAvatar.jpg`, (err, info) => {
			if (err) {
				console.error('err', err);
			} else {
				fs.unlink(`./public/images/${id}/temp.${name[name.length - 1]}`,function(err){
					if(err) return console.log('unlink', err);
				});
			}
		});

	return res.json({ success: true, payload:`public/images/${id}/newAvatar.jpg` , errors: false });
});

export default router