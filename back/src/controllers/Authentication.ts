
import { User, UserClass } from '../model/Auth';
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import mongoose from 'mongoose'
import sharp from 'sharp'
import { stripe } from '../middlewere/stripe';
import AppError from '../Error/AppError'
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { RequestHandler, Request, Response, NextFunction } from 'express'
//const multerStorage = multer.diskStorage({
///  destination: (req, file, cb) => {
//      cb(null, 'public/image')
//   },
// filename: (req, file, cb) => {
//user-77005043739467-3338292929.jpeg
//     const extension = file.mimetype.split('/')[1]
//     cb(null, `user-${req.user?.id}.${Date.now()}.${extension}`)
//  }
//});

//Multer Filter
const multerStorage = multer.memoryStorage();
const multerFilter = async (req: Request, file: any, cb: any) => {
    if (file.mimetype.startWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError("That's's Not A Image", 400), false)
    }
}
const upload = multer({ storage: multerStorage, fileFilter: multerFilter })

export const uploadUserPhoto = upload.single('image')

export const resizeUserPhoto: RequestHandler = async (req, res, next) => {
    if (!req.file) return next()
    req.file.filename = `user-${req.user?.id}.${Date.now()}.jpeg`
    sharp(req.file.buffer).resize(500, 600).toFormat('jpeg').jpeg({ quality: 90 }).toFile('public/images/')
    next()
}




function SendCookieToken(res: Response, token?: string) {
    if (token) {
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

    } else {
        res.cookie('access_token', {
            httpOnly: true,
            expires: Date.now()
        })
    }


}

export const signUp: RequestHandler = async (req, res, next) => {
    const userData = { ...req.body }
    if (!userData.password) {
        throw new AppError('No Passowrd', 404)
    }
    const HashPassword = await bcrypt.hash(userData.password, 12)
    if (!HashPassword) {
        throw new AppError('No Passowrd', 404)
    }
    userData.role = 'client'
    userData.password = HashPassword
    userData.passwordConfirmation = HashPassword
    const newUser = await User.create(userData)

    const token = await newUser.getJwt()
    SendCookieToken(res, token)

    res.status(200).json({
        status: 'Success',
        token,
        data:
            newUser,


    })

}

export const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body
    if (!email && !password) {
        throw new AppError('No Passowrd', 404)
    }
    const user = await User.findOne({ email }).select('+password')

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = await user.getJwt()
        SendCookieToken(res, token)
        res.status(200).json({
            status: 'Success Login',
            token,
            data:

                user



        })
    } else {
        throw new AppError('Incorrect', 401);
    }

}

export const upadteUser: RequestHandler = async (req, res, next) => {
    const body = req.body as Partial<UserClass>
    const user = req.user
    if (!user) {
        throw new AppError('no user data')
    }
    const inputData: any = { ...body }

    if (inputData.password) {
        inputData.password = await bcrypt.hash(inputData.password, 12)
    }
    if (req.file) inputData.photo = req.file.filename
    Object.keys(inputData).forEach((k) => {
        if (k in user) {
            user[k] = inputData[k];

        }

    });

    await user.save()
    res.status(201).json({
        status: 'success',
        data: user


    })
}

export const Logout: RequestHandler = async (req, res, next) => {

    SendCookieToken(res)
    res.status(204).json({
        status: 'success',
        data: null
    })

}

export const getAllUsers: RequestHandler = async (req, res, next) => {
    const users = await User.find()
    if (!users) {
        throw new AppError('No Passowrd', 404)
    }
    res.status(200).json({
        status: 'success',
        data:
        {
            users

        }


    })

}
export const getOneUser: RequestHandler = async (req, res, next) => {
    const user = req.user
    if (!user) {
        throw new AppError('No Auth', 404)
    }
    res.status(200).json({
        status: 'success',
        data: {
            user
        }






    })

}
export const deleteAccount: RequestHandler = async (req, res, next) => {
    const user = req.user
    if (!user) {
        throw new AppError('No User', 404)
    }
    const UserId = user.id
    await User.findByIdAndDelete(UserId)
    SendCookieToken(res)
    res.status(204).json({
        status: 'success',
        data: null
    })
}
export const getAuthLink: RequestHandler = async (req, res, next) => {
    // const state = uuidv4();
    // if (!req.session) throw new AppError('No Session', 404)
    //req.session.state = state;
    const state = req.user?._id
    const args = new URLSearchParams({
        state,
        client_id: 'ca_HS1snREeNE3h2aOj2DVw0CBUZ1yCb7a8',
        scope: 'read_write',
        response_type: 'code',
        'stripe_user[email]': req.user!.email,
        'suggested_capabilities[]': 'transfers'
    });
    const url = `https://connect.stripe.com/express/oauth/authorize?${args.toString()}`;
    return res.json({
        status: 'success',
        data: url
    })
}
export const authorizeAuth: RequestHandler = async (req, res, next) => {
    const state = req.query.state;

    const code = req.query.code as string;

    // if (state !== req.user?._id) throw new AppError('No Good state', 403)

    if (!code) throw new AppError('No Code available')
    try {
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code,
        })
        const connected_account_id = response.stripe_user_id;
        if (!connected_account_id) return res.status(400).json({ error: 'Invalid account id' });
        saveAccountId({ stripeAccountId: connected_account_id, user: req.user! });

        // Render some HTML or redirect to a different page.
        return res.redirect(301, 'http://localhost:8080' + '/Account');
    } catch (err) {
        if (err.type === 'StripeInvalidGrantError') {
            throw new AppError('Invalid authorization code: ' + code, 400);
        } else {
            throw new AppError('An unknown error occurred.' + code);
        }
    }
}
//function saveAccountId({ stripeAccountId, user }: { stripeAccountId: string; user: UserClass }) {
//   // Save the connected account ID from the response to your database.
//   user.stripeAccountId = stripeAccountId;
//   user.save();
//}

export default SendCookieToken;