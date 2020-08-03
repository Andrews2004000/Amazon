import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { User, UserClass } from '../model/Auth';
//import { OAuth2Client } from 'google-auth-library';
import { AccountProvider } from '../model/Auth';

import SendCookieToken from '../controllers/Authentication'
import { RequestHandler } from 'express'
import AppError from '../Error/AppError';


export const protect: RequestHandler = async (req, res, next) => {
    const token = req.token;
    if (!token) {
        throw new AppError('You have no Permissions', 404)
    }
    const id = await User.getIdFromJwt(token)
    const currentUser = await User.findById(id)
    if (!currentUser) {
        throw new AppError('You have no Permissions on it', 404)
    }
    req.user = currentUser;
    next()
}

export const restrictRole = (...roles: Array<UserClass['role']>) => {
    const handler: RequestHandler = (req, res, next) => {
        const user = req!.user
        if (user && !roles.includes(user.role)) {
            throw new AppError('You have no Permissions', 404)
        }
        next()

    }
    return handler


}
/*export const forgotPassword: RequestHandler = async (req, res, next) => {
    // 1) Get User Based On Posted Email
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new AppError('No user email', 404)
    //2) Generate the random reset token
    const resetToken = user.createPasswordResetToken()
    await user.save()

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetToken}`
    const message = `Forgot your password?Submit a PATCH request with your new password and passwordConfirmation to:${resetUrl}.\nIf you didin't`
    //3) Send it ro user's email

    await sendEmail({
        email: user.email,
        subject: 'Your Password Reset Token for 15 min',
        message,

    })
    res.status(200).json({
        status: 'success',
        message: 'Token Send To Email'
    })
}*/
/*export const resetPassword: RequestHandler = async (req, res, next) => {
    // 1) get user based on the token and
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: new Date() }
    });
    if (!user) throw new AppError('No User', 404)


    const { password } = req.body
    if (!password) throw new AppError("No Password , You can't do this action")
    await user.save()


    const token = user._id.toHexString();
    SendCookieToken(res, token)

    res.status(200).json({
        statsu: 'success',
        token,


    })





    //3) upadte changeuserPasswordAt Property For the user


    //4) loG tHE USER iN send JWT
}
*/
//const sendEmail = async (options: any) => {
//1) create A Transporter
// const transporter = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 25,
//      auth: {
//         user: '5c7f7952439f18',
//          password: '97d82f711b731f'
//     }
//Activate in gmail "less secure app" option
//  });

//const mailOptions = {
//    from: 'Andrews Fama <hellofrom@fama.com>',
//    to: options.email,
//    subject: options.subject,
//    text: options.message,
// html:




// }
//await transporter.sendMail(mailOptions);



//}
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

interface EmailDetails {
    to: string,
    subject: string,
    text: string,
}

export const sendEmail = async (emailDetails: EmailDetails) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 25,
        auth: {
            user: '5c7f7952439f18',
            pass: '97d82f711b731f',
        },
    });

    const options: Mail.Options = {
        ...emailDetails,
        from: 'Amazon <no-reply@Amazon.com>',
    }

    await transporter.sendMail(options)
}



export const forgotPassword: RequestHandler = async (req, res) => {
    const userEmail = req.body.email;

    if (!userEmail) throw new AppError('Please insert the user email to recover password');

    const user = await User.findOne({ email: userEmail });

    if (!user) throw new Error('Cannot find a user with that email')

    try {
        const { passwordResetToken, passwordResetTokenHashed, passwordResetTokenExpires } = User.createPasswordResetToken();

        if (!passwordResetToken || !passwordResetTokenHashed || !passwordResetTokenExpires) throw new AppError('Could not create a reset-token. Please try again later.')

        user.passwordResetTokenHashed = passwordResetTokenHashed;
        user.passwordResetTokenExpires = passwordResetTokenExpires;

        await user.save({ validateBeforeSave: false });

        const resetUrl = `http://localhost:8080/resetpassword/${passwordResetToken}`;

        const message = `Forgot your password? Go to this url to reset your password: ${resetUrl} (Valid for 10 min). If you didn't forget your password, please ignore this email.`
        await sendEmail({ to: userEmail, subject: 'Amazon - Reset Password', text: message });

        res.json({
            status: 'success',
            message: 'Reset token sent by email'
        })
    } catch (error) {
        user.passwordResetTokenHashed = '';
        user.passwordResetTokenExpires = new Date();
        await user.save({ validateBeforeSave: false });
        throw new Error(error)
    }


}

export const resetPassword: RequestHandler = async (req, res) => {
    const passwordResetToken = req.query.resetToken as any;
    const newPassword = req.body.password;

    if (!passwordResetToken) throw new AppError('Cannot get password-reset-token from query of url', 400);
    if (!newPassword) throw new AppError('Please enter a password', 400)

    const passwordResetTokenHashed = User.hashPasswordResetToken(passwordResetToken);

    const user = await User.findOne({ passwordResetTokenHashed, passwordResetTokenExpires: { $gt: new Date() } })

    if (!user) throw new AppError('Token is invalid or has expired', 400);

    user.password = await bcrypt.hash(newPassword, 12);
    user.passwordResetTokenHashed = '';
    user.passwordResetTokenExpires = new Date();

    await user.save({ validateBeforeSave: false });

    res.json({
        status: 'success',
        message: 'Password resetted correctly',
    })

}


const CLIENT_ID = process.env.GOOGLE_PLATFORM_CLIENT_ID;

//const client = new OAuth2Client(CLIENT_ID);

//export async function getUserDataFromTokenGoogle(token: string) {
// const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,
//  });
//  const user = ticket.getPayload();
//  if (!user) throw new Error('No user found')

//  const googleAccountId = user.sub;
//  if (!googleAccountId) throw new Error('Could not get Google Account Id')
//  const email = user.email;
// if (!email) throw new Error('Could not get Google Account email')
//  const fullName = user.name;
//  if (!fullName) throw new Error('Could not get Google Account full name')
//  return { googleAccountId, email, fullName, provider: AccountProvider.GOOGLE };
//}

