import Order from '../model/Orders'
import {RequestHandler} from 'express';
import Product from '../model/Products';
import AppError from '../Error/AppError'

export const GetAllOrders:RequestHandler = async(req,res,next)=>{
    let OrdersQuery;
  if(!req.user){
      throw new AppError('You Are not Authenticate')

  }
  if(req.user.role === 'vendor' || req.user.role === 'admin' ){
      OrdersQuery = Order.find({
          vendor:{id:req.user.id},
      })
      .populate(['products','client'])

  }else{
      OrdersQuery  = Order.find({
          client:{id:req.user.id},
      })
      .populate(['products'])
  }
  const orders = await OrdersQuery;
  res.status(200).json({
      status:'succes',
      data:orders
  })
  
}

export const getOrder:RequestHandler = async(req,res,next)=>{
    const singleOrder = await Order.findById(req.params.id);
    if(!singleOrder){
        throw new AppError('No Orders',404)
    }
    res.status(200).json({
        status:'success',
        data:singleOrder
    })
}


export const createOrder:RequestHandler = async(req,res,next)=>{
    const inputsData = req.body;
    if(!inputsData){
        throw new AppError('No InputsData')
    }
    if(!inputsData.product){
        throw new AppError('No InputsData',404)
    }
    const reservateOrder = await Product.findById(inputsData.product)
    if(!reservateOrder){
        throw new AppError('No products with this id',404)
    }
    const vendor = inputsData.vendor._id;
    inputsData.vendor = vendor;
    const newOrder = await Order.create(inputsData);
    res.status(201).json({
        status:'success',
        data:{
            newOrder
        }
    })


}
export const deleteOrder:RequestHandler = async(req,res,next)=>{
    const singleOrder = await Order.findById(req.params.id);
const user = req.user;
    if(!singleOrder){
throw new AppError('No Order')
    }
    if(!user){
        throw new AppError('No User')
    }
    if(user.role !== 'admin'){
        if(singleOrder.client._id.toString() !== user._id.toString()){
            throw new AppError('You Have No Permission');
        }
    }
        await Order.findByIdAndDelete(singleOrder._id)
        res.status(204).json({
        status:'success',
        data:null
        })
    
}

export const editOrder:RequestHandler = async (req,res,next)=>{
    const SingleOrder = await Order.findById(req.params.id)
    const user = req.user;
    if(!user){
        throw new AppError('No User')
    }
    if(!SingleOrder){
        throw new AppError('NO Orders')
    }
    if(user.role !== 'admin'){
        if(SingleOrder.client._id.toString() !== user._id.toString()){
            throw new AppError('No Permission')
        }
    }
    Object.keys(req.body).forEach((key)=>{
        if(key in SingleOrder){
            SingleOrder[key] = req.body[key];
        }
    })
   SingleOrder.save();
    res.status(201).json({
        status:'success',
       message:'Order Saved Good'
    })
}

