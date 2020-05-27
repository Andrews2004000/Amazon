import Products from '../models/Products';
import User from '../models/Authentication';
import { RequestHandler } from 'express';

export const getProducts: RequestHandler = async (req, res, next) => {
    // Create the database query
  const product = await Products.find()
  if(!product){
      const err:any = new Error('No Products')
      err.statusCode = 422;
      throw err;
  }

  
    res.status(200).json({ message: 'You Are Getting A Product', products: product });
};

export const getProduct: RequestHandler = async (req, res, next) => {
    const product = await Products.findById(req.user?._id);
    if (!product) {
        const err: any = new Error('No Products');
        err.statusCode = 422;
        throw err;
    }
    res.status(200).json({ message: 'One Product', product: product });
};
export const createProduct: RequestHandler = async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const scadenza = req.body.scadenza;
    const ratings = req.body.ratings;
    const MaxQuantity = req.body.MaxQuantity;
    const products = new Products({
        title: title,
        description: description,
        price: price,
        category: category,
        scadenza: scadenza,
        ratings: ratings,
        MaxQuantity: MaxQuantity,
    });
    await products.save();
    const user: any = await User.findById(req.user?._id);
    user.product.push(products);
    res.status(200).json({
        message: 'Post Created',
        product: products,
        creator: { _id: user._id, username: user.username },
    });
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
    const prodId = req.params.prodId;
    const product = await Products.findByIdAndRemove(prodId);
    if (!product) {
        const err: any = new Error('Could not find post.');
        err.statusCode = 404;
        throw err;
    }
    if (product.creator.toString() !== req.user?._id) {
        const err: any = new Error('Not authorized!');
        err.statusCode = 403;
        throw err;
    }

    res.status(200).json({ message: 'Products Delets' });
    const user: any = await User.findById(req.user?._id);
    user.product.pull(prodId);
    await user.save();
};

export const updateProduct: RequestHandler = async (req, res, next) => {
    const prodId = req.params.prodId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const scadenza = req.body.scadenza;
    const ratings = req.body.ratings;
    const MaxQuantity = req.body.MaxQuantity;
    const product = await Products.findById(prodId);
    if (!product) {
        const err: any = new Error('There is A Big Error Try Later');
        err.statusCode = 404;
        throw err;
    }
    if (product.creator.toString() !== req.user?._id) {
        const err: any = new Error('You Are Not Athorized');
        err.statusCode = 403;
        throw err;
    }
    product.title = title;
    product.description = description;
    product.price = price;
    product.category = category;
    product.scadenza = scadenza;
    product.ratings = ratings;
    product.MaxQuantity = MaxQuantity;
    const results = await product.save();
    res.status(200).json({ message: 'You have Update Your Products', product: results });
};

export const Search:RequestHandler = async (req,res,next)=>{
const ProductsFromDatabase = Products.find()
const urlSearchQuery = req.query.search as string | undefined;
const categoryFiletr = req.query.category as string | undefined;
if(categoryFiletr){
    ProductsFromDatabase.where('category').equals(categoryFiletr)

   
}
if(urlSearchQuery){
    const searchKeyword = urlSearchQuery.split('+').join(' ')

    ProductsFromDatabase.where('title').regex(new RegExp(searchKeyword,'i'))
}
const Allproducts = await ProductsFromDatabase

if(!Allproducts){
    const err:any = new Error('No Product')
    err.statusCode = 422;
    throw err;

}
res.status(200).json({message:'You are getting Well',products:Allproducts})

}

