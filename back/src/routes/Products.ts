import * as ProductsController from '../controllers/Products';
import ExpressPromiseRouter from 'express-promise-router';
import isAuth from '../middlewares/is-auth'
const router = ExpressPromiseRouter();
router.post('/',isAuth, ProductsController.createProduct);
router.get('/:prodId', ProductsController.getProduct);
 //router.get('/', ProductsController.getProducts); // TOGLI QUESTO
router.delete('/:prodId',isAuth, ProductsController.deleteProduct);
router.patch('/:prodId', isAuth,ProductsController.updateProduct);
///Search
router.get('/', ProductsController.Search); // Metti questo senza prods
////
export default router;
