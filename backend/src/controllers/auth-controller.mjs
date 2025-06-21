import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import AppError from '../models/AppError.mjs';
import UserRepository from '../repositories/users-repositories.mjs';
import { createToken } from '../utilities/jwt.mjs';

export const loginUser = catchErrorAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new AppError('Email or password is missing', 400));

	const user = await new UserRepository().find(email, true);

	if (!user || !(await user.checkPassword(password, user.password))) {
		return next(new AppError('Email or password is wrong', 401));
	}

	const token = createToken(user._id);

	res.status(200).json({ success: true, statusCode: 200, data: { token } });
});
