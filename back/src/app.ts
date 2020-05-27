import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import BodyParser from 'body-parser';

import mongoose from 'mongoose';
import AuthRoutes from './routes/Auth';
import ProductsRoutes from './routes/Products';
const app = express();

const CLIENT_URL = 'http://localhost:8080';
app.use(BodyParser.json());
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use('/user', AuthRoutes);
app.use(ProductsRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route Not Foundsss' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.StatusCode || 500;
    const data = err.data;
    const message = err.message;
    console.log(err);

    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect('mongodb+srv://Andrew:Dalida@cluster0-rsstj.mongodb.net/user?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then((res) => {
        app.listen(5000);
    });
