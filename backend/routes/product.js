import express from "express";
import { addProduct } from '../controllers/productController.js'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

router.post('/add-product',upload.array("file",3),(req,res) => {
  try {
    console.log(req.body)
  
    const image = req.files
    console.log(image)
    
  } catch (error) {
    console.log(error)
  }
})

export default router;