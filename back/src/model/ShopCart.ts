import mongoose, { Schema, Types } from 'mongoose'
import { UserClass } from './Auth'
import { ProductClass } from './Products'

import { getModelForClass, prop, modelOptions, getName, Ref } from '@typegoose/typegoose';
/*export interface IUCartProduct extends mongoose.Document {
    _id: any,
    client: UserClass,
    product: IUProducts,
    vendorStripeAccountId: string;

    details: {
        quantity: number;
        selectedColor: [string];
        sizeAvailable: [number];

    }


    [key: string]: any
*/
type Reference<T> = Ref<T & { _id: Types.ObjectId }, Types.ObjectId & { _id: Types.ObjectId }>

class DetailsProducts {
    @prop()
    quantity?: number;
    @prop({ type: String })
    selectedColor!: string[];
    @prop({ type: Number })
    sizeAvailable!: number[];
}
export class ShoppingClass {
    @prop({ auto: true })
    _id!: mongoose.Types.ObjectId;
    @prop({ immutable: true, required: true, ref: getName(UserClass) })
    client!: Reference<UserClass>
    @prop({ ref: getName(ProductClass), required: true, immutable: true })
    product!: Reference<ProductClass>
    @prop({ _id: false })
    details!: DetailsProducts
    @prop()
    vendorStripeAccountId?: string


}
/*export const CartProduct = new mongoose.Schema({
    product: {
        ref: 'Product',
        type: Schema.Types.ObjectId,
        immutable: true,
        required: true,


    },
    details: {
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        selectedColor: {
            type: [String],
            required: true
        },
        sizeAvailable: {
            type: [Number],
            required: true
        },

    },

    client: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        immutable: true,
        required: true
    },
    vendorStripeAccountId: {
        type: String,
    },
}, { versionKey: false })*/
export const ShoppingCart = getModelForClass(ShoppingClass, {
    schemaOptions: { collection: 'cart' }
});