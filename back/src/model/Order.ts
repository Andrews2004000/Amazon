import mongoose, { Schema, Model } from 'mongoose'
import { IUCartProduct, CartProduct } from '../model/ShopCart'

interface IUOrder extends mongoose.Document {
    _id: any,
    product: IUCartProduct

}


const orderSchema = new mongoose.Schema({
    orderedProducts: [CartProduct]
},
    { versionKey: false }
)

const Order = mongoose.model<IUOrder>('Order', orderSchema)
export default Order