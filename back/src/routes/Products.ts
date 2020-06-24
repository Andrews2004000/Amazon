import express from 'express'
import { protect, restrictRole } from '../middlewere/AppFeaures';
import ExpressPromiseRouter from 'express-promise-router'
import * as ProductsController from '../controllers/Products'
import { UserRole } from '../model/Auth';
const router = ExpressPromiseRouter();
router.route('/')
    .get(ProductsController.getAllProducts)

    .post(protect, ProductsController.createProducts)

router.route('/:prodId')
    .patch(protect, ProductsController.editProduct, restrictRole(UserRole.ADMIN || UserRole.VENDOR))
    .delete(protect, ProductsController.deleteProduct)
    .get(ProductsController.getProduct)

export default router;