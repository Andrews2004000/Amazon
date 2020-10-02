import { stripe } from '../../utils/stripe/stripe';
import stripeCompletedCheckout from '../../utils/stripe/stripeCompletedCheckout';
import stripeUpdateAccountDetails from '../../utils/stripe/stripeUpdateAccountDetails';

const stripeWebhook = (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'account.updated') {
        const account = event.data.object;
        stripeUpdateAccountDetails(account)
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        stripeCompletedCheckout(session);
    }

    console.log('[Webhook] Received')

    res.json({ received: true });
}

export default stripeWebhook;