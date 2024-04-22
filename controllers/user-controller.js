import { validationResult } from 'express-validator';
import fs from 'fs';
import { ApiError } from '../exceptions/api-error.js';
import { userService } from '../service/user-service.js';

class UserController {
	async refresh(req, res, next) {
		try {
			const {refreshToken} = req.cookies;
			console.log('req.cookies', req);
			const userData = await userService.refresh(refreshToken);
			if (fs.existsSync(`public/images/${userData.id}/avatar.jpg`)) {
				userData.avatar = `/static/images/${userData.id}/avatar.jpg`;
			} else {
				userData.avatar = `/static/images/noAva.jpg`;
			}
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		}
		catch (e) {
			next(e);
		}
	}

	async addUser(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
			}
			const userData = await userService.addUser(req.body);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json({ success: true, payload: userData, errors: false });
		}
		catch (e) {
			next(e);
		}
	}

	async updateUser(req, res, next) {
		try {
			const user = await userService.updateUser(req.body);
			return res.json({ success: true, payload: user, errors: false });
		}
		catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json({ success: true, payload: userData, errors: false });
		}
		catch (e) {
			next(e);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json({ success: true, payload: true, errors: false });
		}
		catch (e) {
			next(e);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
			users.forEach(user => {
				if (fs.existsSync(`public/images/${user.id}/avatar.jpg`)) {
					user.avatar = `/static/images/${user.id}/avatar.jpg`
				} else {
					user.avatar = `/static/images/noAva.jpg`
				}
				return user
			})
			return res.json({ success: true, payload: users, errors: false });
		}
		catch (e) {
			next(e);
		}
	}



	async updateUsers(req, res, next) {
		try {
			const users = await userService.updateUsers(req.body);
			return res.json({ success: true, payload: users, errors: false });
		}
		catch (e) {
			next(e);
		}
	}

	async getUser(req, res, next) {
		try {
			if (req.body.id) {
				console.log('getUser', req.body.id);
				let user = await userService.getUser(req.body.id);
				if (fs.existsSync(`public/images/${user.id}/avatar.jpg`)) {
					user.avatar = `/static/images/${user.id}/avatar.jpg`
				} else {
					user.avatar = `/static/images/noAva.jpg`
				}
				return res.json({ success: true, payload: user, errors: false });
			} else {
				next();
			}
		}
		catch (e) {
			next(e);
		}
	}

	async deleteUser(req, res, next) {
		try {
			await userService.deleteUser(req.body.id);
			return res.json({ success: true, errors: false });
		}
		catch (e) {
			next(e);
		}
	}
}

export const userController = new UserController();
