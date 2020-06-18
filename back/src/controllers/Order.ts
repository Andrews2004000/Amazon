import CartItem from '../model/ShopCart'
import { RequestHandler } from 'express';
import AppError from '../Error/AppError'
import Order from '../model/Order'
import { cloneObject } from '../utils/cloneObject';
import { Stripe } from 'stripe';
import { stripe } from '../middlewere/stripe';
import Product from '../model/Products';
import mongoose from 'mongoose'
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

    const ProductsInCart = await CartItem.find({
        client: { _id: user._id },
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

export const getAllOrders: RequestHandler = async (req, res, next) => {

    const user = req.user?._id
    const order = await Order.find().populate('product')
    if (!user) {
        throw new AppError('No Authenticate', 404)

    }
    if (user.role !== 'client') {
        throw new AppError('No Authneticate', 404)
    }
    if (!order) {
        throw new AppError('No Order', 404)

    }

}
export const createCheckout: RequestHandler = async (req, res, next) => {
    const user = req.user;
    if (!user) throw new Error('Cannot get user data');

    // Get products from cart
    const productsInCart = await CartItem.find({ client: { _id: user._id } }).populate('product');

    // Create orderData
    const orderedProducts = productsInCart.map(cartProduct => {
        return cloneObject(cartProduct);
    });

    const orderTotalPrice = productsInCart.map(prod => {
        return prod.product.price * prod.details.quantity
    }).reduce((acc, total) => acc + total, 0);

    const orderLineItems = productsInCart.map(cartItem => {
        return {
            name: cartItem.product.title,
            description: cartItem.product.description,
            images: [cartItem.product.imageUrl ? cartItem.product.imageUrl : ''],
            amount: cartItem.product.price * 100,
            currency: 'usd',
            quantity: cartItem.details.quantity
        };
    })

    // const productTitle = productsInCart.map(prod => {
    //     return prod.product.title
    // })
    // const productImagesRaw = productsInCart.map(prod => {
    //     return prod.product.imageUrl
    // })
    // const productImages = productImagesRaw.filter((url) => {
    //     if (url) return true;
    //     return false;
    // }) as string[];

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
            line_items: orderLineItems,
            payment_intent_data: {
                //  application_fee_amount: orderTotalPrice * 25,
                transfer_group: orderId,
            },
            success_url: `http://localhost:8080/order-product/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:8080/order-product/cancel`,
            metadata: convertObjectToMetadataList(orderData),
        }
    );



    res.status(200).json({
        message: 'success',
        data: {
            sessionId: session.id,
            stripeClientId: 'ca_HS1snREeNE3h2aOj2DVw0CBUZ1yCb7a8'
        }
    })
}

