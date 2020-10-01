import { RequestHandler } from 'express';
import { Product, ProductClass } from '../model/Products'
import delivery from '../JsonFiles/deliveryOptions.json';
import AppError from '../Error/AppError'
const GetDelivery: RequestHandler = async (req, res) => {
    res.json({
        status: 'success',
        data: delivery
    })
}
export default GetDelivery;