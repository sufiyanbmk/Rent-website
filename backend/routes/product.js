import express from "express";
import multer from 'multer'
import crypto from 'crypto'
import { getRentedProducts, deleteProduct, getSingleProduct, } from '../controllers/productController.js'
import { uploadFile } from '../services/awsS3.js'
import {addProduct} from '../helpers/client/product.js'
// import verifyJWT from "../helpers/client/verifyJwt.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

router.post('/add-product',upload.array("file",3),async(req,res) => {
  console.log('----------------------------------------')
  console.log(req.files,'req.filesss')
  const data = JSON.parse( req.body.data );
  const userId = req.body.userId
  const images = [];
  try {
    console.log(req.files.length)
    for (let i = 0; i < req.files.length; i++) {
      const imageName = generateFileName()
      console.log(imageName,'imagename')
      const fileBuffer = req.files[i].buffer;
      console.log(fileBuffer)
      await uploadFile(fileBuffer, imageName, req.files[i].mimetype)
      images.push(imageName);
    }
    // await uploadFile(fileBuffer, imageName, file[0].mimetype).then((res)=>{
    //   console.log(res)
    // }).catch((err)=>{
    //   console.log(err)
    // })
    const createdProduct = addProduct(data,images,userId)
    res.status(200).json({ success: true, message: "Product created" });
  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({ success: false, message: error });
  }
})

router.get('/rented-products/:id', getRentedProducts)

router.delete('/delete-product/:id', deleteProduct)

router.get('/product-detail/:id', getSingleProduct)

// router.get('/search-product/:state/:catagory', getSearchedProduct)

export default router;