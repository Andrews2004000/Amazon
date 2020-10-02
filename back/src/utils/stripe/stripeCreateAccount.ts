import { stripe } from './stripe';

const stripeCreateAccount = async () => {
    const account = await stripe.accounts.create({
        type: 'express',
    });
    return account;
}

export default stripeCreateAccount;