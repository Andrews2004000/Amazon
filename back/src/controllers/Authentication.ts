import User from '../model/Auth';
import { IUser } from '../model/Auth';
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import mongoose from 'mongoose'
import AppError from '../Error/AppError'
import  {RequestHandler,Request,Response,NextFunction} from 'express'

function SendCookieToken(res:Response,token?:string){
 if(token){
     res.cookie('access_token',token,{
         httpOnly:true,
         expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
     })

 }else{
     res.cookie('access_token',{
         httpOnly:true,
         expires:Date.now()
     })
 }
    

}

export const signUp:RequestHandler = async(req,res,next)=>{
const userData = {...req.body}
if(!userData.password){
    throw new AppError('No Passowrd',404)
}
const HashPassword = await bcrypt.hash(userData.password,12)
if(!HashPassword){
    throw new AppError('No Passowrd',404)
}
userData.role = 'client'
userData.password = HashPassword
userData.passwordConfirmation = HashPassword
const newUser = await User.create(userData)

const token = await newUser.getJwt()
    SendCookieToken(res,token)

res.status(200).json({
    status:'Success',
    token,
    data:
        newUser,
        
    
})

}
export const login:RequestHandler = async(req,res,next)=>{
const {email,password} = req.body
if(!email && !password){
    throw new AppError('No Passowrd',404)
}
const user = await User.findOne({email}).select('+password')

if(user && (await bcrypt.compare(password,user.password))){
    const token = await user.getJwt()
    SendCookieToken(res,token)
    res.status(200).json({
        status:'Success Login',
        token,
        data:user
        
    })
} else {
    throw new AppError('Incorrect', 401);
}

}

export const upadteUser:RequestHandler = async(req,res,next)=>{
    const body = req.body as Partial<IUser>
    const user = req.user
    if(!user){
        throw new AppError('NO uSER DATA')
    }
    const inputData:any = {...body}
    if(inputData.password){
        inputData.password = await bcrypt.hash(inputData.password,12)
    }
    Object.keys(inputData).forEach((k) => {
        if (k in user) {
            user[k] = inputData[k];
            
        }
       
    });
    
    await user.save()
    res.status(201).json({
        status:'success',
        data:{
            user
        }

    })
}

export const Logout:RequestHandler = async (req,res,next)=>{
    
    SendCookieToken(res)
    res.status(204).json({
        status:'success',
        data:null
    })

}

export const getAllUsers:RequestHandler = async (req,res,next)=>{
    const users = await User.find()
    if(!users){
        throw new AppError('No Passowrd',404)
    }
    res.status(200).json({
        status:'success',
        data:{
            users
        }
    })

}
export const getOneUser:RequestHandler = async(req,res,next)=>{
    const user = req.user
    if(!user){
        throw new AppError('No Passowrd',404)
    }
    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })

}
export const deletAccount:RequestHandler = async(req,res,next)=>{
const user = req.user
if(!user){
    throw new AppError('No Passowrd',404)
}
const UserId = user.id
await User.findByIdAndDelete(UserId)
    SendCookieToken(res)
res.status(204).json({
    status:'success',
    data:null
})
}