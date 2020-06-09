import mongoose from 'mongoose'
import AppError from '../Error/AppError'
import {IUser} from './Auth'
import {IUProducts} from './Products'
export interface IUCart extends mongoose.Document{
    _id:any,
    client:IUser,
    products:Array<{product:IUProducts;AddToCartDetail:Array<{quantity:number;colorsAvailable:string;sizeAvailable:number}>}>,
   
   
    
  [key:string]:any
}

interface ICartModel extends mongoose.Model<IUCart> { }
const ProductsSchema = new mongoose.Schema({
    product:{
        ref:'Products', 
        type: mongoose.Schema.Types.ObjectId,
        immutable:true,
        required:true
    },
    AddToCartDetail:{
        quantity:Number,
        colorsAvailable:String,
        sizeAvailable:Number,
    }

})

const CartSchema = new mongoose.Schema({
   
    client:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId,
        immutable:true,
       
        
    },
    products:[ProductsSchema]
  
},
{ versionKey: false })
const Cart = mongoose.model<IUCart,ICartModel>('Cart',CartSchema)
export default Cart;
