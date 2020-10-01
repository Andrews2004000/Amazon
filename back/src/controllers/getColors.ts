import { RequestHandler } from 'express';
import { Product, ProductClass } from '../model/Products'
import colors from '../JsonFiles/colors.json';
import AppError from '../Error/AppError'

const GetColors: RequestHandler = async (req, res, next) => {
    res.json({
        status: 'success',
        data: colors
    })
}
export default GetColors