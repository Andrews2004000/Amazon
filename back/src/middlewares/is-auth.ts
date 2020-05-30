import jwt from 'jsonwebtoken';
import User from '../models/Authentication';
import { Request, Response, NextFunction } from 'express';

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const err: any = new Error('Not Authorized');
        err.statusCode = 422;
        throw err;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, 'myownsecretword');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error: any = new Error('Not authenticated !!!!');
        error.statusCode = 401;
        throw error;
    }
    const user = await User.findById(decodedToken.user);
    if (!user) {
        throw new Error('Cannt find User');
    }
    req.user = user;
    next();
};

export default isAuth;
