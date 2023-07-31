import { log } from 'debug';
import { UserModel } from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { mailService } from './mail-service.js';
import { tokenService } from './token-service.js';
import { UserDto } from '../dtos/user-dto.js';
import { ApiError } from '../exceptions/api-error.js';

class UserService {
	async addUser(newUser) {
		console.log('newUser', newUser);
		const candidate = await UserModel.findOne({ email: newUser.email });
		console.log('candidate', candidate);
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${newUser.email} уже существует`);
		}
		const hashPassword = await bcrypt.hash(newUser.password, 3);

		const user = await UserModel.create({ ...newUser,
			password: hashPassword,
			superUser: newUser.superUser || false,
			master: newUser.master || false,
		});

		const userDto = new UserDto(user); // id, email, isActivated
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw ApiError.BadRequest('Пользователь с таким email не найден');
		}
		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw ApiError.BadRequest('Неверный пароль');
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}

	async getUser(id) {
		let user = await UserModel.findById(id).exec();
		delete user.password
		delete user.superUser
		return user;
	}

	updateUser = async (user) =>{
		const newUser = await UserModel.findOneAndUpdate({_id: user.id}, {...user}, {
			new: true
		});
		return newUser;
	}

	deleteUser = async (id) =>{
		return await UserModel.findByIdAndDelete(id).exec();
	}
}

export const userService = new UserService();
