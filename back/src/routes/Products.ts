import * as ProductsController from '../controllers/Products';
import ExpressPromiseRouter from 'express-promise-router';
const router = ExpressPromiseRouter();
router.post('/', ProductsController.createProduct);
router.get('/:prodId', ProductsController.getProduct);
router.get('/', ProductsController.getProducts);
router.delete('/:prodId', ProductsController.deleteProduct);
router.patch('/:prodId', ProductsController.updateProduct);
///Search
router.get('/prods', ProductsController.Search);
////
export default router;
