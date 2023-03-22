import * as  controllers from '../controllers/adminController.js';
import express from "express";

const router = express.Router()

router.post('/login',controllers.adminLogin)

//products

router.get('/products', controllers.getProducts)

router.post('/addProducts',controllers.addProducts)

//catagory

router.get('/catagory', controllers.getCatagory)

router.post('/addCatagory',controllers.addCatagory)

//user details

router.get('/users', controllers.getUsers)

router.put('/block-user', controllers.blockUser)

export default router;