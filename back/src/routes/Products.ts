import * as ProductsController from '../controllers/Products';
import ExpressPromiseRouter from 'express-promise-router';
const router = ExpressPromiseRouter();
router.post('/prod', ProductsController.createProduct);
router.get('/prod:prodId', ProductsController.getProduct);
router.get('/prod', ProductsController.getProducts);
router.delete('/prod:prodId', ProductsController.deleteProduct);
router.patch('/prod:prodId', ProductsController.updateProduct);
export default router;
