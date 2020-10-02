import { RequestHandler } from 'express';
import AppError from '../../utils/AppError';
import stripeGetLoginLink from '../../utils/stripe/stripeGetLoginLink';

const stripeLogin: RequestHandler = async (req, res) => {
    const user = req.user!;
    if (user.stripeAccount.stripeAccountId) {
        const link = await stripeGetLoginLink(user.stripeAccount.stripeAccountId);
        res.json({
            data: link
        })
    } else {
        throw new AppError('You must first connect your account to stripe', 403)
    }
}

export default stripeLogin;