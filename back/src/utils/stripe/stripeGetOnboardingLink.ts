import { stripe } from './stripe';

const stripeGetOnboardingLink = async (accountId) => {
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: process.env.CLIENT_URL + '/admin/billing?message=' + encodeURIComponent('Your session has expired. Please try again.'),
        return_url: process.env.CLIENT_URL + '/admin/billing?message=' + encodeURIComponent('Your request is being processed.'),
        type: 'account_onboarding',
    });
    return accountLink;
}

export default stripeGetOnboardingLink;