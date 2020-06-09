
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as CartController from '../controllers/ShoppingCart'
const router = ExpressPromiseRouter();

router.route('/').get(protect,CartController.GetAllCart).put(protect,CartController.PostToCart)
router.route('/:id').patch(protect,CartController.editCart).get(protect,CartController.getCart).delete(protect,CartController.deleteCart)

export default router;