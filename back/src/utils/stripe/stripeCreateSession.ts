import Stripe from 'stripe';
import { stripe } from './stripe';
import { v4 as uuid } from 'uuid'

const stripeCreateSession = async ({ items, metadata }: { items: Stripe.Checkout.SessionCreateParams.LineItem[], metadata?: Stripe.MetadataParam }) => {
    const transferGroupId = uuid()
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items,
        payment_intent_data: {
            transfer_group: transferGroupId
        },
        success_url: `${process.env.CLIENT_URL}?status=success&session_id={CHECKOUT_SESSION_ID}&message=${decodeURIComponent('Your payment was successfull')}`,
        cancel_url: `${process.env.CLIENT_URL}?status=canceled&message=${decodeURIComponent('Your payment was canceled')}`,
        metadata: {
            ...metadata,
            transferGroupId
        }
    });
    return session;
}

export default stripeCreateSession;