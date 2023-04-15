import express from "express";
import multer from 'multer'
import crypto from 'crypto'
import { getRentedProducts, deleteProduct, getSingleProduct, getSearchedProduct} from '../controllers/productController.js'
import { uploadFile } from '../services/awsS3.js'
import { addProduct, editProduct } from '../helpers/client/product.js'
// import verifyJWT from "../helpers/client/verifyJwt.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

router.post('/add-product',upload.array("file",3),async(req,res) => {
  const data = JSON.parse( req.body.data );
  const userId = req.body.userId
  const images = [];
  try {
    for (let i = 0; i < req.files.length; i++) {
      const imageName = generateFileName()
      const fileBuffer = req.files[i].buffer;
      await uploadFile(fileBuffer, imageName, req.files[i].mimetype)
      images.push(imageName);
    }
    const createdProduct = addProduct(data,images,userId)
    res.status(200).json({ success: true, message: "Product created" });
  } catch (error) {
    res
    .status(500)
    .json({ success: false, message: error });
  }
})

router.get('/rented-products/:id', getRentedProducts)

router.delete('/delete-product/:id', deleteProduct)

router.get('/product-detail/:id', getSingleProduct)

router.put('/edit-product/:id',upload.array("file",3), async(req,res) => {
  const data = JSON.parse( req.body.data );
  const proId = req.params.id
  const images = [];
  try {
    for (let i = 0; i < req.files.length; i++) {
      const imageName = generateFileName()
      const fileBuffer = req.files[i].buffer;
      await uploadFile(fileBuffer, imageName, req.files[i].mimetype)
      images.push(imageName);
    }
    const updateProduct = editProduct(data,images,proId)
    res.status(200).json({ success: true, message: "Product updated" });
  } catch (error) {
    res
    .status(500)
    .json({ success: false, message: error });
  }
})

router.get('/search-product/:state/:catagory', getSearchedProduct)

export default router;