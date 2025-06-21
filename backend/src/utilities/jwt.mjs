import { promisify } from 'util';
import jwt from 'jsonwebtoken';

export const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const verifyToken = async (token) => {
    return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};