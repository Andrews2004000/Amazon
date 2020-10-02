import { RequestHandler } from 'express';
import AppError from '../../utils/AppError';
import stripeCreateAccount from '../../utils/stripe/stripeCreateAccount';
import stripeGetOnboardingLink from '../../utils/stripe/stripeGetOnboardingLink';

const stripeOAuth: RequestHandler = async (req, res) => {
    const user = req.user!;

    if (user.stripeAccount.chargesEnabled) {
        throw new AppError('This user is already connected to stripe')
    }

    let accountId: string;
    if (!user.stripeAccount.stripeAccountId) {
        const account = await stripeCreateAccount()

        accountId = account.id;

        user.stripeAccount.stripeAccountId = account.id;
        await user.save()
    } else {
        accountId = user.stripeAccount.stripeAccountId;
    }

    const onboardingLink = await stripeGetOnboardingLink(accountId)

    res.json({
        data: onboardingLink
    })
}

export default stripeOAuth;