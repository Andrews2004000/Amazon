import CartItem from '../model/ShopCart'
import { RequestHandler } from 'express';
import AppError from '../Error/AppError'
import Order from '../model/Order'
import { cloneObject } from '../utils/cloneObject';

export const postOrder: RequestHandler = async (req, res, next) => {
    // const inputsData = req.body
    // if (!inputsData) {
    //     throw new AppError('No Data', 404)
    // }

    // inputsData.client = req.user?._id;
    //const OrderProduct = await Product.findById(inputsData.product);
    //if (!OrderProduct) {
    //    throw new AppError("Couldn't find any product with that id", 404);
    //}

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
    const order = await Order.find().populate('product');
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