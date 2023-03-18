import { adminLogin, getProducts, addProducts, addCatagory, getCatagory} from '../controllers/adminController.js';
import express from "express";

const router = express.Router()

router.post('/login',adminLogin)

//products

router.get('/products', getProducts)

router.post('/addProducts',addProducts)

//catagory

router.get('/catagory', getCatagory)

router.post('/addCatagory',addCatagory)

export default router;