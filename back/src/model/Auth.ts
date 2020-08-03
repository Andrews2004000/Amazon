import mongoose, { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import AppError from '../Error/AppError'
import crypto from 'crypto'
import { getModelForClass, prop, modelOptions, getName, Ref } from '@typegoose/typegoose';
type Reference<T> = Ref<T & { _id: Types.ObjectId }, Types.ObjectId & { _id: Types.ObjectId }>
export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
    VENDOR = 'vendor'
}
export enum FavoriteCategories {
    TECNOLOGY = 'Tecnology ',
    BOOK = 'Book',
    HOUSE = 'House'
}
export enum AccountProvider {
    EMAIL = 'email',
    GOOGLE = 'google',
    FACEBOOK = 'facebook'
}
@modelOptions({
    schemaOptions: {
        versionKey: false,
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        },
    }
})
/*export interface UserClass extends mongoose.Document {
    _id: any,
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    photo?: [string],
    address?: string,
    phone?: number,
    role: 'client' | 'vendor' | 'admin',
    stripeAccountId?: string,
    passwordChangedAt: number,
    FavoriteCategories?: 'Tecnology' | 'House' | 'Book',
    status: string,
    passwordResetToken: string,
    passwordResetExpires: Date,
    active: boolean,
    Country?: [string],
    [key: string]: any,
    isVendor(): string,
    getJwt(): Promise<string>,
    createPasswordResetToken(): string,



}*/

export class UserClass {
    @prop({ auto: true })
    _id!: mongoose.Types.ObjectId;
    @prop({ default: 'client', enum: UserRole })
    role?: UserRole;
    @prop({ required: true })
    username!: string;
    @prop({ required: true, unique: true, lowercase: true })
    email!: string;
    @prop({ required: true, select: false, unique: false })
    password!: string;
    @prop({ required: true })
    passwordConfirmation?: string;
    @prop()
    photoProfile?: string
    @prop()
    phone?: number;
    @prop({ required: false, unique: false })
    adress?: string;
    @prop({ required: false, type: String })
    Country?: string[]
    @prop()
    stripeAccountId?: string
    @prop({ default: 'Hi I am a new User' })
    status?: string
    @prop({ default: true, select: false })
    active?: boolean
    //  @prop()
    // passwordResetToken?: string
    // @prop()
    // passwordResetExpires?: Date;
    @prop()
    passwordResetTokenHashed?: string;

    @prop()
    passwordResetTokenExpires?: Date;




    /*const userSchema = new mongoose.Schema({
       username: {
           type: String,
           required: true,
           unique: false,
   
       },
       email: {
           type: String,
           required: true,
           unique: true,
           lowercase: true,
   
       },
       password: {
           type: String,
           required: true,
           unique: false,
           select: false
   
       },
       passwordConfirmation: {
           type: String,
           required: true,
           unique: false,
   
       },
       photo: [String],
       phone: Number,
       address: {
           type: String,
           required: false,
           unique: false,
   
       },
       Country:
           [
               {
                   type: String,
                   required: false,
               }
           ],
   
   
       role: {
           type: String,
           enum: ['vendor', 'client', 'admin'],
           default: 'client'
       },
       stripeAccountId: {
           type: String,
   
   
       },
       Favoritecategories: {
           type: String,
           enum: ['Tecnology', 'House', 'Book', 'Not Specified'],
           default: 'Not Specified'
       },
       status: {
           type: String,
           default: "Hi I'm A New User"
       },
       active: {
           type: Boolean,
           default: true,
           select: false
       },
       // passwordChangedAt: Date,
       passwordResetToken: String,
       passwordResetExpires: Date,
   
   
   
   
   },
       { versionKey: false })
       */
    /*interface UserModel extends mongoose.Model<UserClass> {
        getIdFromJwt(token: string): Promise<string>
    
    }*/



    getJwt(): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                { id: this._id },
                'secret',
                {
                    expiresIn: '7d',
                },

                (err, token) => {
                    if (err) {
                        reject(err)
                    }
                    return resolve(token)

                })


        })



    }
    // createPasswordResetToken() {
    //     const resetToken = crypto.randomBytes(32).toString('hex')
    //    crypto.createHash('sha256').update(resetToken).digest('hex');
    //    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    //    return resetToken;


    // }
    static createPasswordResetToken() {
        const passwordResetToken = crypto.randomBytes(32).toString('hex');
        const passwordResetTokenHashed = this.hashPasswordResetToken(passwordResetToken);
        const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

        return { passwordResetToken, passwordResetTokenHashed, passwordResetTokenExpires }
    }

    static hashPasswordResetToken(passwordResetToken: string) {
        return crypto.createHash('sha256').update(passwordResetToken).digest('hex');
    }

    static getIdFromJwt(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'secret' || '',
                (err, decodedToken: any) => {
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



//userSchema.loadClass(UserClass);

//const User = mongoose.model<UserClass, UserModel>('User', userSchema);

//export default User;
export const User = getModelForClass(UserClass, {
    schemaOptions: { collection: 'users' }
});

