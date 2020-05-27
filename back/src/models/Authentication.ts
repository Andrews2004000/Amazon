import  mongoose from 'mongoose'
export interface IUser extends mongoose.Document {
    _id:any;
    username:string;
    email: string;
    password: string;
    address?:string;
    favoriteCategories?:string;
    role: 'client' | 'vendor' | 'admin';
    status:string;
    FavoriteCategories?:string;
    [key: string]: any;
}

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
     
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,

    },
    FavoriteCategories:{
        type:String
    },
    role: {
        type: String,
        enum: ['client', 'vendor', 'admin'],
        default: 'client',
    },
    product: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products'
        }
      ],

    status:{
        type:String,
        default:'Hi Im Am New'
    }
})
const User = mongoose.model<IUser>('User',UserSchema)
export default User