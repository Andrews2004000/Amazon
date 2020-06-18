import mongoose, { Schema } from 'mongoose'
export interface IUProducts extends mongoose.Document {
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


}

const ProductsSchema = new mongoose.Schema({
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
    { versionKey: false })
const Product = mongoose.model<IUProducts>('Product', ProductsSchema)
export default Product
