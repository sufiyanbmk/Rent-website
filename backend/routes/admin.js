import { adminLogin, getProducts } from '../controllers/adminController.js';
import express from "express";

const router = express.Router()

router.post('/login',adminLogin)

//products

router.get('/products', getProducts)

export default router;