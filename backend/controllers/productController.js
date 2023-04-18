import product from "../models/productSchema.js";
import Review from "../models/reviewSchema.js";
import multer from "multer";
import crypto from "crypto";
import { deleteFile, getObjectSignedUrl } from "../services/awsS3.js";
import { deleteProuduct, searchProductHelper } from '../helpers/client/product.js'
import { url } from "inspector";
import { resolve } from "path";
import { rejects } from "assert";

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const addProduct = async (req, res) => {
  const file = req.file;
  const imageName = generateFileName();

  const fileBuffer = file.buffer;
  try {
    await uploadFile(fileBuffer, imageName, file.mimetype);
  } catch (err) {
    console.log(err);
  }
};

// export const getRentedProducts = async (req, res) => {
//   const userID = req.params.id;
//   try {
//     const rentedProduct = await product.find({ userId: userID });
//     for (let product of rentedProduct) {
//       let imageUrl = await getObjectSignedUrl(product.file[0]);
//       product.set("link", imageUrl, { strict: false });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Successfull", data: rentedProduct });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: "Failed" });
//   }
// };

export const getRentedProducts = async (req, res) => {
  const userID = req.params.id;
  try {
    const rentedProducts = await product.find({ userId: userID });
    const promises = rentedProducts.map(async (product) => {
      const signedUrls = await Promise.all(product.file.map(getObjectSignedUrl));
      product.set("links", signedUrls, { strict: false });
      return product;
    });
    const rentedProductsWithSignedUrls = await Promise.all(promises);
    res.status(200).json({ success: true, message: "Successfull", data: rentedProductsWithSignedUrls });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deltedProduct = deleteProuduct(id)
    res.status(200).json({ success: true, message: "Deleted Successfull" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed" });
  }
};

export const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const singleProduct = await product.findOne({ _id: id }).populate({ path: 'reviews', model: 'Review' });
    let imageUrl = []
    const singleProductWithImgLInk = singleProduct.file.map(async (x) => {
      let Url = await getObjectSignedUrl(x);
      imageUrl.push(Url);
    })
    await Promise.all(singleProductWithImgLInk);
    singleProduct.set("link", imageUrl, { strict: false });
    res
      .status(200)
      .json({ success: true, message: "Successfull", data: singleProduct });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "Failed" });
  }
};

export const getSearchedProduct = async(req,res) => {
  const {state,catagory} = req.params;
  const page = parseInt(req.query.page)
  try{
    const data = await searchProductHelper(state,catagory,page)
    const promises = data.map(async (product) => {
      const signedUrls = await Promise.all(product.file.map(getObjectSignedUrl));
      product.set("links", signedUrls, { strict: false });
      return product;
    });
    const productsWithSignedUrls = await Promise.all(promises);
    res
    .status(200)
    .json({ success: true, message: "Successfull", data: productsWithSignedUrls ,count:data.length });
  }catch(err){
    res.status(500).json({ success: false, message: "Failed" });
  }
}