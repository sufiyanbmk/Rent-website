import productSchma from '../models/productSchema.js'
import multer from 'multer'
import crypto from 'crypto'

import { uploadFile, deleteFile, getObjectSignedUrl } from '../services/awsS3.js'


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const addProduct = async(req, res) => {
  const file = req.file
  const imageName = generateFileName()

  const fileBuffer = file.buffer
  try{
    await uploadFile(fileBuffer, imageName, file.mimetype)

  }catch(err){
    console.log(err)
  }
}