import { getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import mongoose from 'mongoose';

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
export class NewsletterUserClass {
    @prop({ auto: true })
    _id!: mongoose.Types.ObjectId

    @prop({ required: true, unique: true, lowercase: true })
    email!: string;
}

export const NewsletterUser = getModelForClass(NewsletterUserClass, {
    schemaOptions: { collection: 'newsletterUsers' }
});