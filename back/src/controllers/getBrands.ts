import { RequestHandler } from 'express';
import { Product, ProductClass } from '../model/Products'
import brands from '../JsonFiles/brands.json';
import AppError from '../Error/AppError'
const GetBrands: RequestHandler = async (req, res) => {
    // const AllBrands = JSON.stringify(brands)

    res.json({
        status: 'success',
        data: brands,
    })

}
export default GetBrands;