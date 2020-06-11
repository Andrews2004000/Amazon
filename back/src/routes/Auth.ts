import express from 'express'
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as UserController from '../controllers/Authentication'
const router = ExpressPromiseRouter();
//Routes For Normal Things
router.route('/')
    .post(UserController.login)
    .put(UserController.signUp)
    .get(protect, UserController.getAllUsers)


/// Routes For Updatings
router.route('/userUpdatings')

    .get(protect, UserController.getOneUser)
    .patch(protect, UserController.upadteUser)
    .post(UserController.Logout)
    .delete(protect, UserController.deleteAccount)

router.patch('/promote', protect, UserController.promoteUser);

export default router;