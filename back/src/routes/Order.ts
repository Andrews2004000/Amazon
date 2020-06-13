
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as OrderController from '../controllers/Order'
const router = ExpressPromiseRouter();

router.route('/').get(protect, OrderController.getAllOrders).post(protect, OrderController.postOrder).delete(protect, OrderController.deleteOrder)
export default router;