import { ShoppingCart, ShoppingClass } from '../model/ShopCart'
import { User, UserClass } from '../model/Auth'
import { RequestHandler } from 'express';
import AppError from '../Error/AppError'
import { Product, ProductClass } from '../model/Products';
import { isDocument } from '@typegoose/typegoose'

export const GetAllCart: RequestHandler = async (req, res, next) => {
    let ProductsInCart;

    if (!req.user) {
        throw new AppError('You Are not Authenticate')

    }
    if (req.user.role === 'vendor' || req.user.role === 'client') {
        ProductsInCart = ShoppingCart.find({
            client: req.user._id.toHexString(),
        })
            .populate('product')
    } else {
        throw new AppError('No Products In Cart', 404)
    }
    const cartProducts = await ProductsInCart;
    res.status(200).json({
        status: 'succes',
        data: cartProducts,


    })

}

// export const getCart: RequestHandler = async (req, res, next) => {
//     const ProductsInCart = await Cart.findById(req.params.id).populate('product');
//     if (!ProductsInCart) {
//         throw new AppError('No cart', 404)
//     }
//     res.status(200).json({
//         status: 'success',
//         data: ProductsInCart
//     })
// }


export const PostToCart: RequestHandler = async (req, res, next) => {
    const inputsData = { ...req.body.userInputs };
    if (!inputsData) {
        throw new AppError('No Data', 404)
    }
    if (!req.user) throw new AppError('no user')
    inputsData.client = req.user._id;

    //const product = await Product.findById(inputsData.product)
    //  if (!product) {
    //     throw new AppError('No Product', 404)
    // }

    // Cerca se ci sono altri items nel carrello con lo stesso id: ti restituisce un array
    const foundProducts = await ShoppingCart.find().where('product').equals(inputsData.product)

    // Se non ci sono items con quel product, creane uno nuovo
    if (foundProducts.length === 0) {
        // const product = foundProducts[1];
        //  product.details.quantity = 1;

        inputsData.details.quantity = 1;
        const productId = await Product.findById(inputsData.product).populate('vendor')
        if (!productId) throw new AppError('no productId')
        if (!isDocument(productId.vendor)) throw new Error('Could not get vendor')
        console.log(productId.vendor.stripeAccountId)
        const StripeId = productId.vendor.stripeAccountId

        inputsData.vendorStripeAccountId = StripeId
        const newCart = await ShoppingCart.create(inputsData)
    }

    // Se c'è un item nel carrello con lo stesso product, aumenta la quantity di quello
    else if (foundProducts.length === 1) {
        const product = foundProducts[0];
        console.log(product)
        if (product.details.quantity) product.details.quantity++;
        product.save();
    }

    // Se ci sono più items diversi con lo stesso product, forse c'è stato qualcosa che non va, quindi manda un errore
    else {
        throw new Error('Internal Error: multiple items in the cart with the same product id')
    }


    res.status(201).json({
        status: 'success',

    })


}

export const DeleteItemFromCart: RequestHandler = async (req, res, next) => {
    const inputsData = { ...req.body.userInputs };

    const prodId = await ShoppingCart.findById(req.params.id)
    const user = req.user;
    if (!prodId) {
        throw new AppError(' no products in cart')

    }
    if (!user) {
        throw new AppError('You Are Not Authenticate', 404)

    }
    if (user.role !== 'client') {
        throw new AppError('You have no permission', 404)
    }
    // inputsData.details.quantity--;
    await ShoppingCart.findByIdAndDelete(prodId._id)
    res.status(204).json({
        message: 'Ok Deleted',
        data: null

    })

}
