import { isDocument } from '@typegoose/typegoose'
import Stripe from 'stripe'
import { Order, OrderStatus } from '../../models/orderModel'
import { stripe } from './stripe'

const stripeCompletedCheckout = async (session: Stripe.Checkout.Session) => {
    const orderIds: string[] = JSON.parse(session.metadata.orderIds)
    const transferGroupId = session.metadata.transferGroupId;

    const paymentIntentId = session.payment_intent as string;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, { expand: ['charges'] });
    const chargeId = paymentIntent.charges.data[0].id;

    for (let orderId of orderIds) {
        const order = await Order.findById(orderId).populate({
            path: 'store',
            populate: {
                path: 'vendor'
            }
        })
        if (isDocument(order.store) && isDocument(order.store.vendor)) {
            order.status = OrderStatus.PENDING;
            const amount = Math.round(order.totalPrice * (100 - parseInt(process.env.APPLICATION_FEE_PERCENTAGE)));

            // TO-DO: Fix bug
            await stripe.transfers.create({
                amount,
                currency: 'eur',
                destination: order.store.vendor.stripeAccount.stripeAccountId,
                transfer_group: transferGroupId,
                source_transaction: chargeId || null
            });

            await order.save()
        }
    }

    console.log('Payment processed successfully')
}

export default stripeCompletedCheckout;