
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as CartController from '../controllers/ShoppingCart'
const router = ExpressPromiseRouter();

router.route('/').get(protect,CartController.GetAllCart).post(protect,CartController.PostToCart)


export default router;