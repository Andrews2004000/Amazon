import mongoose, { Schema } from'mongoose'
export interface IUproducts extends mongoose.Document{
    _id:any,
    title:string,
    description:string,
    imageUrl?:string,
    price:number,
    scadenza?:Date,
    size?:[number],
    tags?:"videogames"|"phones"|"computers"|"fantasy"|"action"|"history"|"livingroom"|"garden"|"bedroom",
    colorsAvailable?:"red"|"blue"|"green"|"yellow"|"grey"|"Black"|"All Available",
    category:'Tecnology'|'House'|'Book'|'Not Specified',
    ratings:number,
    MaxQuantity:number,
    [key:string]:any


}

const ProductsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    imageUrl:{
        type:String,  
    },
    size:{
        type:Number,
        
    },
    tags:
        {
            type:String,
    enum:["videogames","phones","computers","fantasy","action","history","livingroom","garden","bedroom"],
    default:"Not Specified"

        },
    
    colorsAvailable:{
    type:String,
    enum:["red","blue","green","yellow","grey","Black","All Available"],
    default:"All Available"

    },
    price:{
        type:Number,
        required:true,
    },
  

    category:{
        type:String,
        enum:['Tecnology','House','Book','Not Specified'],
        default:'Not Specified'

    },
    ratings:{
        type:Number,
        required:true

    },
    MaxQuantity:{
        required:true,
        type:Number,
    },
    vendor:{
        ref:'User',
        type:Schema.Types.ObjectId,
        immutable: true,

    },
    scadenza:{
        type:Date,
        default:Date.now()
    },
    

},
{ versionKey: false })
const Product = mongoose.model<IUproducts>('Products',ProductsSchema)
export default Product
