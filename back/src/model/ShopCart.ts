import mongoose, { Schema } from 'mongoose'
import { IUser } from './Auth'
import { IUProducts } from './Products'
export interface IUCartProduct extends mongoose.Document {
    _id: any,
    client: IUser,
    product: IUProducts
    details: {
        quantity: number;
        selectedColor: [string];
        sizeAvailable: [number];
    }


    [key: string]: any
}
const CartProduct = new mongoose.Schema({
    product: {
        ref: 'Product',
        type: Schema.Types.ObjectId,
        immutable: true,
        required: true

    },
    details: {
        quantity: {
            type: Number,
            required: true
        },
        selectedColor: {
            type: [String],
            required: true
        },
        sizeAvailable: {
            type: [Number],
            required: true
        }
    },
    client: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        immutable: true,
        required: true
    },
}, { versionKey: false })
const Cart = mongoose.model<IUCartProduct>('CartProduct', CartProduct)
export default Cart;
