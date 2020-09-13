
import { User, AccountProvider, UserClass } from '../model/Auth';
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import mongoose, { Document } from 'mongoose'
import sharp from 'sharp'
import * as GoogleOAuth from './GoggleAuth'
import axios from 'axios';
import { stripe } from '../middlewere/stripe';

import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
//import { getUserDataFromTokenGoogle,getUserDataFromTokenFaceBook } from '../middlewere/AppFeaures'
import * as SocialFeauture from '../middlewere/AppFeaures'
import { RequestHandler, Request, Response, NextFunction } from 'express'
import { DocumentType } from '@typegoose/typegoose'
import path from 'path';
import AppError from '../Error/AppError';




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
// const multerFilter = async (req: Request, file: any, cb: any) => {
//     if (file.mimetype.startWith('image')) {
//         cb(null, true)
//     } else {
//         cb(new AppError("That's's Not A Image", 400), false)
//     }
// }
const upload = multer({ storage: multerStorage })

export const uploadUserPhoto = upload.single('photoProfile')

export const resizeAndSaveUserPhoto: RequestHandler = async (req, res, next) => {
    if (!req.file) return next()
    req.file.filename = `user-${req.user?._id || req.documentId}${path.extname(req.file.originalname)}`;
    sharp(req.file.buffer).resize(500, 600).toFormat('jpeg').jpeg({ quality: 90 }).toFile(path.join(process.cwd(), 'public', 'images', req.file.filename))
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
    const userData = req.body
    if (!userData.password) {
        throw new AppError('No Passowrd provide', 404)
    }
    const HashPassword = await bcrypt.hash(userData.password, 12)
    if (!HashPassword) {
        throw new AppError('Cant hash the password', 404)
    }
    userData.role = 'client'
    userData.password = HashPassword
    userData.passwordConfirmation = HashPassword
    userData._id = req.documentId;
    if (req.file) userData.photoProfile = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    const newUser = await User.create(userData)
    await GoogleRecaptcha(req)

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
// export const SocialLogin: RequestHandler = async (req, res, next) => {
//  const { provider, token } = req.query;
//   if (provider !== AccountProvider.GOOGLE && provider !== AccountProvider.FACEBOOK) {
//      throw new AppError('You Must Specified a provider')
//  }
//   let userData: { googleAccountId?: string; facebookAccountId?: string; email: string; username: string; provider: AccountProvider } | null = null;
//   let user: DocumentType<UserClass> | null = null;
//  if (provider === AccountProvider.GOOGLE) {
//       userData = await SocialFeauture.getUserDataFromTokenGoogle(token);
//   }
//
//  if (provider === AccountProvider.FACEBOOK) {
//       userData = await SocialFeauture.getUserDataFromTokenFaceBook(token);
//   }

//  if (!userData) throw new Error('Could not get user data');
//
//   if (provider === AccountProvider.GOOGLE) {
//      user = await User.findOne({ googleAccountId: userData.googleAccountId });
//  }

//  if (provider === AccountProvider.FACEBOOK) {
//      user = await User.findOne({ facebookAccountId: userData.facebookAccountId });
//  }
//  if (!user) {
//      user = await User.create({
//          ...userData,
//         password: 'SOCIAL_ACCOUNT_PASSWORD'
//     })
//
//  } else {
//      let hasChanged = false;
//      if (user.username !== userData.username) {
//         user.username = userData.username;
//          hasChanged = true;
//     }
//
//       if (user.email !== userData.email) {
//           user.email = userData.email;
//          hasChanged = true;
//      }
//
//      if (hasChanged) {
//          await user.save();
//      }
//   }
//   const jwt = await user.getJwt();
//
//   SendCookieToken(res, jwt);
//
//   res.json({
//       status: 'success',
//       data: user
////   })


//} -->

export const SocialLogin: RequestHandler = async (req, res, next) => {
    const token = req.query.token as string
    const provider = req.query.provider as string
    if (provider !== AccountProvider.GOOGLE) {
        throw new AppError('You Must specify a provider in query(google)', 400)

    }
    let userData: { googleAccountId?: string; userEmail: string; userName: string; provider?: AccountProvider } | null = null;
    let user: DocumentType<UserClass> | null = null
    if (provider === AccountProvider.GOOGLE) {
        userData = await GoogleOAuth.getGoogleUserId(token)

    }
    if (!userData) throw new AppError('Could Not Get UserData')
    if (provider === AccountProvider.GOOGLE) {
        user = await User.findOne({ googleAccountId: userData.googleAccountId })

    }
    if (!user) {
        user = await User.create({
            ...userData as any,
            password: 'SOCIAL_ACCOUNT_PASSWORD'
        })
    } else {
        let hasChanged = false;
        if (user.username !== userData.userName) {
            user.username = userData.userName;
            hasChanged = true;
        }
        if (user.email !== userData.userEmail) {
            user.email = userData.userEmail;
            hasChanged = true;
        }
        if (hasChanged) {
            await user.save();

        }
    }
    const jwt = await user.getJwt()
    SendCookieToken(res, jwt)
    res.json({
        status: 'success',
        data: user
    })


}
export const upadteUser: RequestHandler = async (req, res, next) => {
    const body = req.body as Partial<UserClass>
    const user = req.user as any;
    if (!user) {
        throw new AppError('no user data')
    }
    const inputData: any = { ...body }

    if (inputData.password) {
        inputData.password = await bcrypt.hash(inputData.password, 12)
    }
    if (req.file) inputData.photoProfile = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`


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
    const UserId = user._id
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
    const state = req.user?._id.toHexString();
    if (!state) throw new Error('Not authenticated')
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
function saveAccountId({ stripeAccountId, user }: { stripeAccountId: string; user: DocumentType<UserClass> }) {
    // Save the connected account ID from the response to your database.
    user.stripeAccountId = stripeAccountId;
    user.save();
}
async function GoogleRecaptcha(req: Request) {


    const RECAPTCHA_SERVER_KEY = '6LcJ7r4ZAAAAAG_Mra8AqZyfkAqCXYpLp7ZY37I6'

    const humanKey = req.body.token;

    // Validate Human
    const { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify/?secret=${RECAPTCHA_SERVER_KEY}&response=${humanKey}`)

    if (humanKey === null || !data.success) {
        throw new AppError(`YOU ARE NOT A HUMAN.`, 404)
    }


    console.log("SUCCESS!")
}
export default SendCookieToken;