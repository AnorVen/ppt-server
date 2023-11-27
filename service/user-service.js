import bcrypt from 'bcrypt';
import fs from 'fs';
import { UserDto } from '../dtos/user-dto.js';
import { ApiError } from '../exceptions/api-error.js';
import { UserModel } from '../models/user-model.js';
import { tokenService } from './token-service.js';

class UserService {
	async addUser(newUser) {
		const candidate = await UserModel.findOne({ email: newUser.email });
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${newUser.email} уже существует`);
		}
		const hashPassword = await bcrypt.hash(newUser.password, 3);

		const user = await UserModel.create({
			...newUser,
			password: hashPassword,
			superUser: newUser.superUser || false,
			master: newUser.master || false,
			type: newUser.type || 'trainer',
		});

		const userDto = new UserDto(user); // id, email, isActivated
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async refresh(refreshToken) {
		console.log('refreshToken', refreshToken);
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}
		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}


	async login(email, password) {
		console.log(123, email, password);
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
		const users = await UserModel.find().sort({surname: 1});
		return users.map(user => new UserDto(user));
	}
	
	async getUser(id) {
		let user = await UserModel.findById(id).exec();
		return new UserDto(user);
	}

	updateUser = async (user) => {
		console.log('user', user);
		const newUser = await UserModel.findOneAndUpdate({ _id: user.id }, { $set: { ...user } });
		if (fs.existsSync(`./public/images/${user.id}/newAvatar.jpg`)) {
			fs.rename(`./public/images/${user.id}/newAvatar.jpg`, `./public/images/${user.id}/avatar.jpg`, () => ({}));
		}
		console.log('newUser', newUser);
		return new UserDto(newUser);
	};


	updateUsers = async (users) => {
		const newUser = await UserModel.findOneAndUpdate({ _id: user._id }, { ...user });
		return newUser;
	};

	deleteUser = async (id) => {
		return await UserModel.findByIdAndDelete(id).exec();
	};
}

export const userService = new UserService();
