import mongoose, { Schema, Model } from 'mongoose'
import { IUser } from '../model/Auth'
import { IUProducts } from '../model/Products'


interface IUOrder extends mongoose.Document {
    _id: any,
    client: IUser
    product: IUProducts
}
const orderSchema = new mongoose.Schema({
    client: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        immutable: true,
        required: true,

    },
    product: {
        ref: 'Product',
        type: Schema.Types.ObjectId,
        immutable: true,
        required: true
    },

},
    { versionKey: false })

const Order = mongoose.model<IUOrder>('Order', orderSchema)
export default Order