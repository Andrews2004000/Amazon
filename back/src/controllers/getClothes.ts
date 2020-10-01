import { RequestHandler } from 'express';
import { Product, ProductClass } from '../model/Products'
import clothes from '../JsonFiles/clothing.json';
import AppError from '../Error/AppError'

const GetClothes: RequestHandler = async (req, res, next) => {
    res.json({
        status: 'success',
        data: clothes
    })
}
export default GetClothes
