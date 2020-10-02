import stripeLib from 'stripe';

export const stripe = new stripeLib(process.env.STRIPE_CLIENT_ID_SECRET, {
    apiVersion: '2020-08-27',
});