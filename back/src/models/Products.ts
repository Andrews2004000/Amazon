import * as mongoose from 'mongoose'
export interface IUProducts extends mongoose.Document {
    // Propreties
    _id:any;
    title:string;
    description:string;
    price: string;
    imageUrl:string;
    category?:string;
    scadenza:string;
    ratings?:string;
    creator:object;
    MaxQuantity:number;

}

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true

    },
 
    price:{
        type:String,
        required:true
    },
    category:{
        type: String,
        enum: ['Tecno', 'House', 'Book'],
       

    },
    scadenza:{
        type:String
    },
    ratings:{
        type:String,
    },
    MaxQuantity:{
        type:Number,
        required:true

    },
  
   
   creator:{
      type: mongoose.Schema.Types.ObjectId,
       ref:'User',
      
   }
},
{timestamps:true})
const Product = mongoose.model<IUProducts>('Product',ProductSchema)
export default Product