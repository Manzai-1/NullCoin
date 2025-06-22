import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import AppError from '../models/AppError.mjs';
import UserRepository from '../repositories/users-repositories.mjs';
import { createToken } from '../utilities/jwt.mjs';

export const loginUser = catchErrorAsync(async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password)
		return next(new AppError('Username or password is missing', 400));

	const user = await new UserRepository().find(username, true);

	if (!user || !(await user.checkPassword(password, user.password))) {
		return next(new AppError('Username or password is wrong', 401));
	}

	const token = createToken(user._id);

	res.status(200).json({ success: true, statusCode: 200, data: { token } });
});
