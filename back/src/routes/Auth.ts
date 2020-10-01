import express from 'express'
import multer from 'multer'

import { protect, restrictRole, resetPassword, forgotPassword } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as UserController from '../controllers/Authentication'
import { getNewDocumentId } from '../middlewere/utilsMiddlewares';

const router = ExpressPromiseRouter();
//multer


router.route('/').get(UserController.getUsers)
//Routes For Normal Things
router.route('/')
    .post(UserController.login)
    .put(getNewDocumentId, UserController.uploadUserPhoto, UserController.resizeAndSaveUserPhoto, UserController.signUp)

//Resetting Password
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword').patch(resetPassword)
/// Routes For Updatings
router.route('/userUpdatings')

    .get(protect, UserController.getOneUser)
    .patch(protect, UserController.uploadUserPhoto, UserController.resizeAndSaveUserPhoto, UserController.upadteUser)
    .post(protect, UserController.Logout)
    .delete(protect, UserController.deleteAccount)


//stripe
router.get('/stripe-oauth/oauth-link', protect, UserController.getAuthLink);
router.get('/stripe-oauth/authorize', protect, UserController.authorizeAuth);

export default router;