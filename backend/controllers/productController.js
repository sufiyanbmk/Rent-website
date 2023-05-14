import product from "../models/productSchema.js";
import Review from "../models/reviewSchema.js";
import User from "../models/userSchema.js"
import multer from "multer";
import crypto from "crypto";
import { deleteFile, getObjectSignedUrl } from "../services/awsS3.js";
import { deleteProuduct, searchProductHelper, searchFilter, cityFilter, priceFilter } from '../helpers/client/product.js'

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
    const rentedProducts = await product.find({ userId: userID }).sort({featured: -1,createdAt: -1})
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
    const productUserDetail = await User.findOne({ _id: singleProduct.userId });
    const userImageUrl = await getObjectSignedUrl(productUserDetail.profileImage);
    const fileUrls = await Promise.all(singleProduct.file.map((file) => getObjectSignedUrl(file)));
    singleProduct.set("link", fileUrls, { strict: false });
    productUserDetail.set("image", userImageUrl, { strict: false });
    singleProduct.set("user", productUserDetail, { strict: false });
    res.status(200).json({ success: true, message: "Successfull", data: singleProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed" });
  }
};

export const getSearchedProduct = async(req,res) => {
  const {state,category,page} = req.body;
  const limit = 3;
  let skip = page * limit;
  // const page = parseInt(req.query.page)
  try{
    const data = await searchProductHelper(state,category,skip,limit)
    const promises = data.map(async (product) => {
      const signedUrls = await Promise.all(product.file.map(getObjectSignedUrl));
      product.set("links", signedUrls, { strict: false });
      return product;
    });
    const productsWithSignedUrls = await Promise.all(promises);
    // console.log(productsWithSignedUrls)
    res
    .status(200)
    .json({ success: true, message: "Successfull", data: productsWithSignedUrls ,count:data.length });
  }catch(err){
    console.log(err)
    res.status(500).json({ success: false, message: "Failed" });
  }
}

export const getFilterSearch = async (req,res ) => {
  let page = parseInt(req.query.page)
  let name = req.query.name;
  const limit = 3;
  let skip = page * limit;
  try{
    const data = await searchFilter(name,skip,limit)
    const promises = data.map(async (product) => {
      const signedUrls = await Promise.all(product.file.map(getObjectSignedUrl));
      product.set("links", signedUrls, { strict: false });
      return product;
    });
    const productsWithSignedUrls = await Promise.all(promises);
    // console.log(productsWithSignedUrls)
    res
    .status(200)
    .json({ success: true, message: "Successfull", data: productsWithSignedUrls ,count:data.length });
  }catch(err){
    console.log(err)
    res.status(500).json({ success: false, message: "Failed" });
  }
}

export const getFilteredCity = async (req,res ) => {
  let page = parseInt(req.query.page)
  let city = req.query.city;
  console.log(page)
  const limit = 3;
  let skip = page * limit;
  try{
    const data = await cityFilter(city,skip,limit)
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
    console.log(err)
    res.status(500).json({ success: false, message: "Failed" });
  }
}

export const getFilterPrice = async (req,res ) => {
  let page = parseInt(req.query.page)
  let {min,max } = req.query;
  const limit = 3;
  let skip = page * limit;
  try{
    const data = await priceFilter(min,max,skip,limit)
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
    console.log(err)
    res.status(500).json({ success: false, message: "Failed" });
  }
}