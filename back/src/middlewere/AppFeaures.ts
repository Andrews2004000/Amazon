import crypto from 'crypto';
import { User, UserClass } from '../model/Auth';
import nodemailer from 'nodemailer'
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
export const forgotPassword: RequestHandler = async (req, res, next) => {
    // 1) Get User Based On Posted Email
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new AppError('No user email', 404)
    //2) Generate the random reset token
    const resetToken = User.createPasswordResetToken()
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
}
export const resetPassword: RequestHandler = async (req, res, next) => {
    // 1) get user based on the token and
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
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
const sendEmail = async (options: any) => {
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

    const mailOptions = {
        from: 'Andrews Fama <hellofrom@fama.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:




    }
    //await transporter.sendMail(mailOptions);



}






