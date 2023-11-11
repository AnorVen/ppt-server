import { Router } from 'express';
import * as fs from 'fs';
import sharp from 'sharp';
import { userController } from '../controllers/user-controller.js';

const router = new Router();

router.all('/', (req, res, next) => {
	res.status(200).json(`router/`);
});

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/refresh', userController.refresh);
router.post('/registration', userController.addUser);

router.post('/upload', async (req, res) => {
	console.log(req?.files);
	const name = req?.files?.file?.name;
	if (!name) return
	const id = req.body.user;
	if (!fs.existsSync(`public/images/${id}`)) {
		fs.mkdir(`public/images/${id}`, err => {
			if (err) throw err; // не удалось создать папку
		});
	}
	
	await req.files.file.mv(`public/images/${id}/${name}`);

	await sharp(`./public/images/${id}/${name}`)
	.toFormat('jpeg')
	.jpeg()
	.resize(600, 600)
	.toFile(`./public/images/${id}/newAvatar.jpg`, (err, info) => {
		if (err) {
			console.error('err', err);
		} else {
			fs.unlink(`./public/images/${id}/${name}`,
				function (err) {
					if (err) return console.log('unlink', err);
				});
		}
	});

	return res.json({ success: true, payload: `/static/images/${id}/newAvatar.jpg`, errors: false });
});

export default router;