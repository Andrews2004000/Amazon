import mongoose, { Schema, Types } from 'mongoose'
import { UserClass } from './Auth';
/*export interface IUProducts extends mongoose.Document {
    _id: any,
    title: string,
    description: string,
    imageUrl?: string,
    price: number,
    scadenza?: Date,
    size?: [number],

    tags?: Array<"videogames" | "phones" | "computers" | "fantasy" | "action" | "history" | "livingroom" | "garden" | "bedroom">,
    colorsAvailable?: Array<"red" | "blue" | "green" | "yellow" | "grey" | "Black" | "All Available">,
    category: 'Tecnology' | 'House' | 'Book' | 'Not Specified',
    ratings?: number,
    MaxQuantity: number,
    [key: string]: any


}*/
import { getModelForClass, prop, modelOptions, getName, Ref } from '@typegoose/typegoose';
type Reference<T> = Ref<T & { _id: Types.ObjectId }, Types.ObjectId & { _id: Types.ObjectId }>
// enum TagsType {
//     VIDEOGAMES = " videogames",
//     PHONE = "phones",
//     COMPUTERS = "computers",
//     FANTASY = "fantasy",
//     ACTION = "action",
//     HISTORY = "history",
//     LIVINGROOM = "livingroom",
//     GARDEN = "garden",
//     BEDROOM = "bedroom"
//  }
// enum ColorsAvailable {
//     RED = "Red",
//     BLUE = "Blue",
//     ORANGE = "Orange",
//     BLACK = "Black",
//     WHITE = "White",
//     GREEEN = "Green",
//     PURPLE = "Purple",
//     VIOLET = "Violet",
//     AZULMARINE = "AzulMarine",
//     PINK = "pink"

// }
enum AllCategory {
    TECNOLOGY = 'Tecnology',
    HOUSE = 'House',
    BOOK = 'Book',
    NOT_SPECIFIED = 'Not Specified'

}

export class ProductClass {
    @prop({ auto: true })
    _id!: mongoose.Types.ObjectId;
    @prop({ required: true })
    title!: string;
    @prop({ required: true, trim: true })
    description?: string;
    @prop()
    imageUrl?: string;
    @prop({ type: String })
    size?: string[];
    @prop({ type: String })
    tags?: string[];
    @prop({ default: 'ALL Available', type: String })
    colorsAvailable?: string[]
    @prop({ required: true })
    price!: number
    @prop({ enum: AllCategory })
    category?: AllCategory
    @prop()
    ratings!: number;
    @prop()
    MaxQuantity!: number;
    @prop({ ref: getName(UserClass), required: true, immutable: true })
    vendor!: Reference<UserClass>;
    @prop({ ref: getName(UserClass), immutable: true })
    stripeAccountId?: Reference<UserClass>
    @prop({ default: Date.now() })
    scadenza?: Date

}

/*const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
    },
    size: {
        type: [String],

    },
    tags:
    {
        type: [String],
        enum: ["videogames", "phones", "computers", "fantasy", "action", "history", "livingroom", "garden", "bedroom"],
        default: "phones"

    },

    colorsAvailable: {
        type: [String],
        enum: ["Red",
            "Blue",
            "Orange",
            "Black",
            "White",
            "Green",
            "Purple",
            "Violet",
            "AzulMarine",
            "pink"],


    },
    price: {
        type: Number,
        required: true,
    },


    category: {
        type: String,
        enum: ['Tecnology', 'House', 'Book', 'Not Specified'],
        default: 'Not Specified'

    },
    ratings: {
        type: Number,


    },
    MaxQuantity: {
        required: true,
        type: Number,
    },
    vendor: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        immutable: true,

    },
    stripeAccountId: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        immutable: true,
    },
    scadenza: {
        type: Date,
        default: Date.now()
    },


},
    { versionKey: false })*/
export const Product = getModelForClass(ProductClass, {
    schemaOptions: { collection: 'products' }
});
