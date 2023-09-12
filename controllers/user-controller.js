import { bd } from '../database/index.js';
import { userService } from '../service/user-service.js';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-error.js';

class UserController {
	async addUser(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
			}
			const userData = await userService.addUser(req.body);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		}
		catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
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
			return res.json(token);
		}
		catch (e) {
			next(e);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
			return res.json(users);
		}
		catch (e) {
			next(e);
		}
	}

	async updateUser(req, res, next) {
		try {
			const user = await userService.updateUser(req.body);
			return res.json(user);
		}
		catch (e) {
			next(e);
		}
	}

	async getUser(req, res, next) {
		try {
			if (req.body.id) {
				let user = await userService.getUser(req.body._id);

				return res.json(user);
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
			await userService.deleteUser(req.body._id);
			return res.status(200).json(`Пользователь ${req.body.surname} ${req.body.name} удален`);
		}
		catch (e) {
			next(e);
		}
	}
}


export const userController = new UserController();
