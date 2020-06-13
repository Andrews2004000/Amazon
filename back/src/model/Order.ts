import mongoose, { Schema, Model } from 'mongoose'
import { IUser } from '../model/Auth'
import { IUProducts } from '../model/Products'
import { IUCartProduct } from '../model/ShopCart'

interface IUOrder extends mongoose.Document {
    _id: any,
    product: IUCartProduct

}
const orderSchema = new mongoose.Schema({

    product: [
        {
            ref: 'CartProduct',
            type: Schema.Types.ObjectId,
            immutable: true,
            required: true
        }
    ]

},
    { versionKey: false })

const Order = mongoose.model<IUOrder>('Order', orderSchema)
export default Order