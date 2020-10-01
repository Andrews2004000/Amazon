import { RequestHandler } from 'express';
import { Product, ProductClass } from '../model/Products'
import release from '../JsonFiles/newRelease.json';
import AppError from '../Error/AppError'

const GetClothes: RequestHandler = async (req, res, next) => {
    res.json({
        status: 'success',
        data: release
    })
}
export default GetClothes
