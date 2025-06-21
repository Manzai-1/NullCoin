import AppError from '../models/AppError.mjs';
import UserRepository from '../repositories/users-repositories.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import { verifyToken } from '../utilities/jwt.mjs';

export const authenticateToken = catchErrorAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.toLowerCase().startsWith('bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) return next(new AppError('You must be logged in.', 401));

	const decoded = await verifyToken(token);
	const user = await new UserRepository().findById(decoded.id);
	req.user = user;

	next();
});
