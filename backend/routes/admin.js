import * as  controllers from '../controllers/adminController.js'
import {getSingleProduct } from '../controllers/productController.js';
import express from "express";

const router = express.Router()

router.post('/login',controllers.adminLogin)

//dashboard

router.get('/getAllDashboardData', controllers.getDashboardData)

//products

router.get('/products', controllers.getProducts)

router.post('/addProducts',controllers.addProducts)

router.get('/single-product/:id', getSingleProduct)

//catagory

router.get('/catagory', controllers.getCatagory)

router.post('/addCatagory',controllers.addCatagory)

//user details

router.get('/users', controllers.getUsers)

router.put('/block-user', controllers.blockUser)

//reported 

router.get('/reported-product', controllers.reportedProduct)

router.delete('/removeProduct/:id', controllers.deleteProduct)

export default router;