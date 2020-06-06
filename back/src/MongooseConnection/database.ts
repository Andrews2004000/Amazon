const DB = 'mongodb+srv://Andrew:Dalida@cluster0-rsstj.mongodb.net/user?retryWrites=true&w=majority' || ''
import mongoose from 'mongoose'
 export async function mongooseconnect(){
    try {
        console.log('Connecting to database');
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('Connected');
    } catch (error) {
        console.log(error);
    }

}