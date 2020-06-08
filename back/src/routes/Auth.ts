import express from 'express'
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as UserController from '../controllers/Authentication'
const router = ExpressPromiseRouter();
//Routes For Normal Things
router.route('/')
.post(UserController.login)
.put(UserController.signUp)
.get(protect,UserController.getAllUsers)


/// Routes For Updatings
router.route('/userUpdatings')
.get(UserController.getOneUser)
.patch(UserController.upadteUser)
.post(UserController.Logout)
.delete(protect,restrictRole('admin' || 'vendor'|| 'client'),UserController.deletAccount)

export default router;