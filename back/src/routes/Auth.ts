import * as AuthController from '../controllers/Auth';
import ExpressPromiseRouter from 'express-promise-router';
import isAuth from '../middlewares/is-auth';
const router = ExpressPromiseRouter();

router.post('/login', AuthController.login);
router.patch('/status', AuthController.updateUserStatus);
router.put('/signup', AuthController.signUp);
router.delete('/user', AuthController.deleteUser);
router.patch('/user', isAuth, AuthController.restrictTo('admin'), AuthController.updateUser);
export default router;
