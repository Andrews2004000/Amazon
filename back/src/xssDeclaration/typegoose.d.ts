import mongoose from 'mongoose';

declare module '@typegoose/typegoose' {
    type Reference<R> = R | { _id: mongoose.Types.ObjectId }
}
