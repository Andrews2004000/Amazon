
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as OrdersController from '../controllers/Orders'
const router = ExpressPromiseRouter();

router.route('/').get(protect,OrdersController.GetAllOrders).post(protect,OrdersController.createOrder)
router.route('/:id').patch(protect,OrdersController.editOrder).get(protect,OrdersController.getOrder).delete(protect,OrdersController.deleteOrder)

export default router;