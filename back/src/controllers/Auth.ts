import User from '../models/Authentication';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RequestHandler, Request, Response, NextFunction } from 'express';

export const login: RequestHandler = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    const user = await User.findOne({ email: email });
    if (!user) {
        const err: any = new Error('No User With This email');
        err.statusCode = 401;
        throw err;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
        const err: any = new Error('No User With This password');
        err.statusCode = 401;
        throw err;
    }
    const token: string = jwt.sign(
        {
            email: loadedUser.email,
            user: loadedUser._id.toString(),
        },
        'myownsecretword',
        { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, user: loadedUser._id.toString() });
};

export const signUp: RequestHandler = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username: username,
        email: email,
        role: role,
        password: hashedPassword,
    });
    const result = await user.save();
    res.status(201).json({ message: 'User Create', user: result._id });
};

export const getUserStataus: RequestHandler = async (req, res, next) => {
    const user = await User.findById(req.user);

    if (!user) {
        const error: any = new Error('User not found.');
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({ status: user.status });
};
export const updateUserStatus: RequestHandler = async (req, res, next) => {
    const newStatus = req.body.status;

    const user = await User.findById(req.user);
    if (!user) {
        const error: any = new Error('User not found Sorry Bro.');
        error.statusCode = 404;
        throw error;
    }
    user.status = newStatus;
    await user.save();
    res.status(200).json({ message: 'User Updated' });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.user);
    if (!user) {
        throw new Error('Nope Bro');
    }
    res.status(200).json({ message: 'Deleted User' });
};
export const updateUser: RequestHandler = async (req, res, next) => {
    User.findByIdAndUpdate(req.user, { $set: req.body }, function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('RESULT: ' + result);

        res.status(200).json({ message: 'User Updated Correctly' });
    });
};

export const restrictTo = (...roles: any[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user && !roles.includes(req.user.role)) {
            const err: Error = new Error('No Permission');
            return err;
        }
        next();
    };
};

///Comemevdvggcgcgsygygiggiiggg
