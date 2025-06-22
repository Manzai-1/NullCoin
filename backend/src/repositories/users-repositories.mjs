import userModel from '../models/userModel.mjs';

export default class UserRepository {
	async add(user) {
		await userModel.create(user);
		return { ...user, password: undefined };
	}

	async find(username, login) {
		return login === true
			? await userModel.findOne({ username }).select('+password')
			: await userModel.findOne({ username });
	}

	async findById(id) {
		return await userModel.findById(id);
	}
}
