import mongoose, { Schema, Model, Types } from 'mongoose'
import { ShoppingClass } from '../model/ShopCart'
import { UserClass } from '../model/Auth'
import { getModelForClass, prop, modelOptions, getName, Ref } from '@typegoose/typegoose';
type Reference<T> = Ref<T & { _id: Types.ObjectId }, Types.ObjectId & { _id: Types.ObjectId }>
//interface IUOrder extends mongoose.Document {
//   _id: any,
//   orderedProducts: IUCartProduct[],
//  totalPrice: number
//}
export class OrderClass {
    @prop({ auto: true })
    _id!: mongoose.Types.ObjectId;
    @prop({ type: ShoppingClass })
    orderedProducts!: ShoppingClass[]
    @prop()
    totalPrice?: number
    // @prop({ ref: getName(UserClass) })
    // user!: Reference<UserClass>;
}


/*const orderSchema = new mongoose.Schema({
    orderedProducts: [CartProduct],
    totalPrice: Number

},
    { versionKey: false }
)*/

//const Order = mongoose.model<IUOrder>('Order', orderSchema)
//export default Order
export const Order = getModelForClass(OrderClass, {
    schemaOptions: { collection: 'order' }
});