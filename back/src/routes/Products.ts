import * as ProductsController from '../controllers/Products';
import ExpressPromiseRouter from 'express-promise-router';
const router = ExpressPromiseRouter();
router.get('/', ProductsController.createProduct);
router.get('/:prodId', ProductsController.getProduct);
// router.get('/', ProductsController.getProducts); // TOGLI QUESTO
router.delete('/:prodId', ProductsController.deleteProduct);
router.patch('/:prodId', ProductsController.updateProduct);
///Search
router.get('/', ProductsController.Search); // Metti questo senza prods
////
export default router;
