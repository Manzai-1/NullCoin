import userModel from '../models/userModel.mjs';

export default class UserRepository {
	async add(user) {
		await userModel.create(user);
		return { ...user, password: undefined };
	}

	async find(email, login) {
		return login === true
			? await userModel.findOne({ email: email }).select('+password')
			: await userModel.findOne({ email: email });
	}

	async findById(id) {
		return await userModel.findById(id);
	}
}
