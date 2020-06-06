import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import AppError from '../Error/AppError'

export interface IUser extends mongoose.Document{
_id:any,
username:string,
email:string,
password:string,
passwordConfirmation:string,
photo?:[string],
address?:string,
phone:[number],
role:'client'|'vendor'|'admin',
StripeAccount?:string,
passwordChangedAt:number,
FavoriteCategories?:'Tecnology' | 'House' | 'Book',
status:string,
passwordResetToken:string,
passwordResetExpires:Date,
active:boolean,
Country?:[string],
[key:string]:any,
isAdmin():string,
getJwt():Promise<string>,



}
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:false,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
        unique:false,
        select:false

    },
    passwordConfirmation:{
        type:String,
        required:true,
        unique:false,

    },
    photo:[String],
    phone:[Number],
    address:{
        type:String,
        required:false,
        unique:false,

    },
    Country:
    [
        {
            type:String,
            required:false,
        }
    ],
        
    
    role:{
        type:String,
        enum:['vendor','client','admin'],
        default:'client'
    },
    StripeAccount:{
        tyep:String,
        required:false,

    },
    Favoritecategories:{
        type:String,
        enum:['Tecnology','House','Book','Not Specified'],
        default:'Not Specified'
    },
    status:{
        type:String,
        default:"Hi I'm A New User"
    },
    active:{
        type:Boolean,
        default:true,
        select:false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
 



},
{ versionKey: false })
interface UserModel  extends mongoose.Model<IUser>{
    getIdFromJwt(token:string):Promise<string>

}

class UserClass extends mongoose.Model{
    idAdmin(){
        return this.role === 'admin'
    }
    getJwt(){
        return new Promise((resolve,reject)=>{
            jwt.sign(
                {id:this._id},
                'secret',
                {
                    expiresIn:'7d',
                },
            
            (err,token)=>{
                if(err){
                    reject(err)
                }
                return resolve(token)
                
            })
        

        })
    
    
    
    }
    static getIdFromJwt(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'secret' || '',
             (err, decodedToken:any) => {
                if (err) {
                    return reject(err);
                }
                if (!decodedToken.id) {
                    return reject('No Id Found');
                }
                resolve(decodedToken.id);
            });
        });
    }
  

}



userSchema.loadClass(UserClass);

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;

