import { ShoppingClass, ShoppingCart } from '../model/ShopCart'
import stripeCompletedCheckout from '../utils/stripe/stripeCompletedCheckout';
import stripeUpdateAccountDetails from '../utils/stripe/stripeUpdateAccountDetails';

import { RequestHandler } from 'express';
import AppError from '../Error/AppError'
import { Order, OrderClass } from '../model/Order'
import { cloneObject } from '../utils/cloneObject';
import { Stripe } from 'stripe';
import { stripe } from '../middlewere/stripe';
import { Product, ProductClass } from '../model/Products';
import mongoose from 'mongoose'
import { isDocument } from '@typegoose/typegoose';
function convertObjectToMetadataList<T>(obj: T) {
    const jsonObj = JSON.stringify(obj);
    const listElements = jsonObj.match(/.{1,500}/g);
    return { ...listElements };
}

function convertMetadataListToObject<T extends object>(list: T) {
    const jsonObject = [...Object.values(list)].join('');
    return JSON.parse(jsonObject);
}

export const postOrder: RequestHandler = async (req, res, next) => {

    const user = req.user;
    if (!user) throw new Error('Cannot get user data');

    const ProductsInCart = await ShoppingCart.find({
        client: user._id.toHexString(),
    })

    const orderedProducts = ProductsInCart.map(cartProduct => {
        return cloneObject(cartProduct);
    });

    const newOrder = await Order.create({ orderedProducts })


    res.status(200).json({
        message: 'Order success',
        data: newOrder
    })
}

export const deleteOrder: RequestHandler = async (req, res, next) => {
    const SingleOrder = await Order.findById(req.prams.id)
    if (!SingleOrder) {
        throw new AppError('No Order', 404)
    }
    const user = req.user;
    if (!user) {
        throw new AppError('You Are Not Authenticate!!!', 404)

    }
    if (user.role !== 'client') {
        throw new AppError('You have No Permission', 404)
    }
    await Order.findByIdAndDelete(SingleOrder)
    res.status(204).json({
        message: 'YOU have delete Your Order Successufly',
        data: null,
    })

}


export const createCheckout: RequestHandler = async (req, res, next) => {
    const user = req.user;
    if (!user) throw new Error('Cannot get user data');

    // Get products from cart
    const productsInCart = await ShoppingCart.find({ client: user._id.toHexString() }).populate('product').populate('product.price');

    // Create orderData
    const orderedProducts = productsInCart.map(cartProduct => {
        return cloneObject(cartProduct);
    });

    const orderTotalPrice = productsInCart.map(prod => {
        let price = 0;
        if (isDocument(prod.product)) {
            price = prod.product.price * (prod.details.quantity || 0);
        }
        return price;
    }).reduce((acc, total) => acc + total, 0);

    /* const orderLineItems = productsInCart.map(CartItem => {
         return {
             name: CartItem.product.title,
             description: CartItem.product.description,
             images: [CartItem.product.imageUrl ? CartItem.product.imageUrl : ''],
             amount: CartItem.product.price * 100,
             currency: 'usd',
             quantity: CartItem.details.quantity
         };
     })*/

    const productTitle = productsInCart.map(prod => {
        if (isDocument(prod.product)) {
            return prod.product.title
        } else {
            return '';
        }
    })
    const productImagesRaw = productsInCart.map(prod => {
        if (isDocument(prod.product)) {
            return prod.product.imageUrl
        } else {
            return '';
        }
    })
    const productImages = productImagesRaw.filter((url) => {
        if (url) return true;
        return false;
    }) as string[];

    // Potrebbero servirci per dopo

    // const vendorWithStripeAccount = productsInCart.map((prod => {
    //     return prod.vendorStripeAccountId;
    // }))

    // if (!vendorWithStripeAccount) throw new AppError('no Account', 404)

    // Create order _id
    const orderId = new mongoose.Types.ObjectId().toHexString();

    // Create order data
    const orderData = { orderedProducts, _id: orderId, totalPrice: orderTotalPrice }

    // Create stripe session
    const session = await stripe.checkout.sessions.create(
        {
            payment_method_types: ['card'],
            line_items: [{
                name: `${productTitle}--Order Boom`,
                description: 'Buy Your Product',
                images: productImages,
                amount: orderTotalPrice * 100,
                quantity: 1,
                currency: 'usd',
            }],
            //  payment_intent_data: {
            //  application_fee_amount: orderTotalPrice * 25,
            //     transfer_group: orderId,
            //    },

            mode: 'payment',
            success_url: `http://localhost:8080/success-order/order-product/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:8080/order-product/cancel`,
            // metadata: convertObjectToMetadataList(orderData),
        }
    );



    res.status(200).json({
        message: 'success',
        data: {
            sessionId: session.id,

            stripeClientId: 'pk_test_aHRgrAbca3xoC2uAeJ23MHP300xReY1EAc'
        }
    })
}
export const webHooks: RequestHandler = async (req, res, next) => {
    const sig = req.headers['stripe-signature']
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig as any, process.env.WEBHOOK_SECRET)
    } catch (err) {
        return res.status(400).send(`WebHook Error:${err.message}`)
        console.log(err)

    }
    if (event.type === 'account.updated') {
        const account = event.data.object

    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

    }
    console.log('[Webhook]Received')
    res.json({ received: true })
}
export const getAllOrders: RequestHandler = async (req, res, next) => {
    //let ordersQuery;

    // if (!req.user) {
    //     throw new AppError('You are not authenticated');
    //  }
    //  if (req.user.role === 'vendor' || req.user.role === 'admin') {
    //      ordersQuery = Order.find({
    //          vendor: { _id: req.user.id }
    //      }).populate('product')
    //  } else {
    //       ordersQuery = Order.find({
    //           client: { _id: req.user.id }
    //      }).populate('product')
    //  }
    const allOrders = await Order.find();
    res.json({
        status: 'success',
        data: allOrders,
    })
}
