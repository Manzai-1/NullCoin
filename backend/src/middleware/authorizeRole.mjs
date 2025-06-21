import AppError from "../models/AppError.mjs";

export const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You are not authorized.', 403));
        }
        next();
    }
}