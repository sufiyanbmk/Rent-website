import productSchma from '../models/productSchema.js'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const addProduct = async(req, res) => {
  console.log(req.body)
  console.log(req.file)
  try{

  }catch(err){

  }
}