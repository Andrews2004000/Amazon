import mongoose from 'mongoose'
import AppError from '../Error/AppError'
import {IUser} from '../model/Auth'
import {IUProducts} from '../model/Products'
interface IUOrders extends mongoose.Document{
    _id:any,
    product:IUProducts,
    vendor:IUser,
    client:IUser,
    [key:string]:any
}

const OrdersSchema = new mongoose.Schema({
    product:{
        ref:'Products', 
        type: mongoose.Schema.Types.ObjectId,
        immutable:true,
        required:true
    },
    vendor:{
        ref:'User', 
        type:mongoose.Schema.Types.ObjectId,
        immutable:true,
        required:true
    },
    client:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId,
        immutable:true,
       
        
    }
})
const Order = mongoose.model<IUOrders>('Order',OrdersSchema)
export default Order;
