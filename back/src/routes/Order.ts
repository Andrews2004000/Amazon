
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as OrderController from '../controllers/Order'
const router = ExpressPromiseRouter();

//router.route('/').get(protect, OrderController.getAllOrders)
router.route('/').post(protect, OrderController.createCheckout).delete(protect, OrderController.deleteOrder).get(protect, OrderController.createCheckout)
export default router;