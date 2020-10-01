import mongoose from 'mongoose'
import { ProductClass, Product } from '../model/Products'
import { RequestHandler } from 'express'
import AppError from '../Error/AppError'
import { User, UserClass, UserRole } from '../model/Auth'
interface GenericObject {
    [key: string]: any
}
export const getAllProducts: RequestHandler = async (req, res, next) => {
    const reqQuery = { ...req.query } as any
    const excludeFields = ['page', 'limit', 'skip', 'sort', 'owned', 'search', 'populate']
    excludeFields.forEach((el => delete reqQuery[el]))

    const querySearch = req.query.search as string;
    Object.keys(reqQuery).forEach(key => {
        reqQuery[key] = decodeURIComponent(reqQuery[key])
    })

    let productQuery = Product.find(reqQuery)
    const QueryString = decodeURIComponent(req.query.populate as string);

    const QueryArray = QueryString.split(",");
    QueryArray.forEach(queryString => {
        productQuery = productQuery.populate(queryString);

    })
    if (req.token && req.query.owned == 'true') {
        const currentUserId = await User.getIdFromJwt(req.token)
        const currentUser = await User.findById(currentUserId)
        //    if (currentUser?.role === (UserRole.VENDOR)) {
        productQuery = productQuery.where('vendor').equals(currentUserId)

    }

    //Search
    if (querySearch) {
        const searchKeyWord = querySearch.split('+').join(' ') as string;
        productQuery.where('title').regex(new RegExp(searchKeyWord, 'i'))
    }
    //Sort

    if (req.query.sort) {
        productQuery = productQuery.sort(req.query.sort)
    }

    const products = await productQuery;
    res.json({
        status: 'success',
        data: products
    })
}

export const getProduct: RequestHandler = async (req, res, next) => {
    const productQuery = await Product.findById(req.params.prodId).populate('vendor')
    //let query = Product.findById(req.params.prodId)
    // const product = await Product.findById(req.params.prodId).populate('vendor').populate('vendor.username')
    // const QueryString = decodeURIComponent(req.query.populate as string);

    //Search  const QueryArray = QueryString.split(",");
    //  QueryArray.forEach(queryString => {
    //     query = query.populate(queryString);

    //  })

    if (!productQuery) throw new AppError('No Product Found with that id')
    const product = await productQuery;
    res.status(200).json({
        status: 'success',
        data: product
    })
}
export const createProducts: RequestHandler = async (req, res, next) => {
    const ProductData = { ...req.body.userInputs };
    if (!req.user) throw new AppError('No Authenticate ')
    ProductData.vendor = req.user._id;
    // ProductData.vendor.stripeAccountId = req.user.stripeAccountId
    const newProduct = await Product.create(ProductData)

    if (!newProduct) {
        throw new AppError('NO PRODUCTS', 404)
    }
    res.status(201).json({
        status: 'Success',
        data: newProduct
    })
}
export const editProduct: RequestHandler = async (req, res, next) => {
    const product = await Product.findById(req.params.prodId) as any;
    if (!product) {
        throw new AppError('NO PRODUCTS', 404)
    }
    const user = req.user
    if (!user) {
        throw new AppError('NO User', 404)
    }
    if (user.role !== 'admin') {
        if (product.vendor._id.toString() !== user._id.toString()) {
            throw new AppError('NO Capable', 404)
        }

    }
    Object.keys(req.body).forEach((k) => {
        if (k in product) {
            product[k] = req.body[k]
        }
    })
    product.save()
    res.status(201).json({
        status: 'success',
        data: product
    })

}


export const deleteProduct: RequestHandler = async (req, res, next) => {
    const product = await Product.findById(req.params.prodId)
    if (!product) {
        throw new AppError('NO PRODUCTS', 404)
    }
    const user = req.user;
    if (!user) {
        throw new AppError('NO USER', 404)
    }
    //if (user.role !== 'admin') {
    //     if (product.vendor._id.toString() !== user._id.toString()) {
    //        throw new AppError('NO Capable', 404)

    //    }
    // }
    await Product.findByIdAndDelete(product._id)
    res.status(204).json({
        status: 'success',
        data: null
    })

}