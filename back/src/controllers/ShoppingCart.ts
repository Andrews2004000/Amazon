import Cart from '../model/ShopCart'
import {RequestHandler} from 'express';
import Product from '../model/Products';
import AppError from '../Error/AppError'

export const GetAllCart:RequestHandler = async(req,res,next)=>{
    let ProductsInCart;
  if(!req.user){
      throw new AppError('You Are not Authenticate')

  }
  

  if(req.user.role === 'client'){

  
      ProductsInCart  = Cart.find({
          client:{_id:req.user.id},
      })
      .populate('products')
  }else{
      throw new AppError('No Products In Cart',404)

  }
  const cart = await ProductsInCart;
  res.status(200).json({
      status:'succes',
      data:cart
  })
  
}

export const getCart:RequestHandler = async(req,res,next)=>{
    const ProductsInCart = await Cart.findById(req.params.id).populate('products');
    if(!ProductsInCart){
        throw new AppError('No cart',404)
    }
    res.status(200).json({
        status:'success',
        data:ProductsInCart
    })
}


export const PostToCart:RequestHandler = async(req,res,next)=>{
    const inputsData = {...req.body};
    if(!inputsData){
        throw new AppError('No Data',404)
    }
    inputsData.client = req.user?._id;
    
   
  //  const reservateCart = await Product.findById(inputsData.product)
   // if(!reservateCart){
    //  throw new AppError('No products with this id',404)
   // }

    const newCart = await Cart.create(inputsData)

   
    res.status(201).json({
        status:'success',
        data:
            newCart
        
    })


}
export const deleteCart:RequestHandler = async(req,res,next)=>{
    const ProductsInCart = await Cart.findById(req.params.id);
const user = req.user;
    if(!ProductsInCart){
throw new AppError('No Order')
    }
    if(!user){
        throw new AppError('No User')
    }
    if(user.role !== 'admin'){
        if(ProductsInCart.client._id.toString() !== user._id.toString()){
            throw new AppError('You Have No Permission');
        }
    }
        await Cart.findByIdAndDelete(ProductsInCart._id)
        res.status(204).json({
        status:'success',
        data:null
        })
    
}

export const editCart:RequestHandler = async (req,res,next)=>{
    const ProductsInCart = await Cart.findById(req.params.id)
    const user = req.user;
    if(!user){
        throw new AppError('No User')
    }
    if(!ProductsInCart){
        throw new AppError('NO cart')
    }
    if(user.role !== 'admin'){
        if(ProductsInCart.client._id.toString() !== user._id.toString()){
            throw new AppError('No Permission')
        }
    }
    Object.keys(req.body).forEach((key)=>{
        if(key in ProductsInCart){
            ProductsInCart[key] = req.body[key];
        }
    })
   ProductsInCart.save();
    res.status(201).json({
        status:'success',
       message:'Order Saved Good'
    })
}
