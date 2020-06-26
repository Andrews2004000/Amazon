import express from 'express'
import multer from 'multer'
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as UserController from '../controllers/Authentication'
import { getNewDocumentId } from '../middlewere/utilsMiddlewares';
const router = ExpressPromiseRouter();
//multer



//Routes For Normal Things
router.route('/')
    .post(UserController.login)
    .put(getNewDocumentId, UserController.uploadUserPhoto, UserController.resizeAndSaveUserPhoto, UserController.signUp)

    .get(protect, UserController.getAllUsers)

router.route('/forgotPassword').post(UserController.login)
router.route('/resetPassword/:token').post(UserController.login)
/// Routes For Updatings
router.route('/userUpdatings')

    .get(protect, UserController.getOneUser)
    .patch(protect, UserController.uploadUserPhoto, UserController.resizeAndSaveUserPhoto, UserController.upadteUser)
    .post(protect, UserController.Logout)
    .delete(protect, UserController.deleteAccount)



router.get('/stripe-oauth/oauth-link', protect, UserController.getAuthLink);
router.get('/stripe-oauth/authorize', protect, UserController.authorizeAuth);
export default router;