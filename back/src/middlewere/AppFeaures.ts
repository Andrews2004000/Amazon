
import User from '../model/Auth';
import { IUser } from '../model/Auth';
import mongoose from 'mongoose'
import AppError from '../Error/AppError'
import  {RequestHandler,Request,Response,NextFunction} from 'express'

export const protect:RequestHandler = async(req,res,next)=>{
    const token = req.token;
    if(!token){
        throw new AppError('You have no Permissions',404)
    }
    const id = await User.getIdFromJwt(token)
    const currentUser = await User.findById(id)
   if(!currentUser){
    throw new AppError('You have no Permissions on it',404)
   }
    req.user = currentUser;
    next()
}

export const restrictRole = (...roles:Array<IUser['role']>)=>{
    const handler:RequestHandler =  (req,res,next)=>{
        const user = req!.user
        if(user && !roles.includes(user.role)){
            throw new AppError('You have no Permissions',404)
        }
        next()

    }
    return handler


}

