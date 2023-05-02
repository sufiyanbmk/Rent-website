import products from "../../models/productSchema.js";
import Review from "../../models/reviewSchema.js"
import { deleteFile } from "../../services/awsS3.js"

export function addProduct(data,image,userId){
  return new Promise(async(resolve,reject) =>{
    const newProduct = new products({
      userId:userId,
      productName: data.productName,
      price: data.price,
      category:data.catagory,
      documents:data.documents,
      description:data.description,
      address:data.address,
      city:data.city,
      state:data.state,
      file:image,    
    })
    await products.create(newProduct).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export function deleteProuduct(id){
  return new Promise(async (resolve,reject)=>{
    const product = await products.findById(id)
    product.file.map((x) => {
      deleteFile(x)
    })
    await product.deleteOne({ _id: product._id }).then((res) => {
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export function editProduct(data,image,proId){
  return new Promise(async(resolve,reject)=>{
    try{
      if(image.length > 0){
        data.file = image
      }else{
        data.file = data.image;
        data.image = []
      }
      const oldProduct = await products.findByIdAndUpdate(proId,data)
      oldProduct.file.map((x) => {
        deleteFile(x)
      })
      resolve('successfull')
    }catch(err){
      reject(err)
    } 
  })
}

export function searchProductHelper(state,category,skip,limit){
  return new Promise(async(resolve,reject)=>{
    await products.find({state,category}).populate({ path: 'reviews', model: 'Review' }).skip(skip).limit(limit).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export function searchFilter(Letter, skip, limit) {
  const searchCriteria = {
    productName: { $regex: `^${Letter}`, $options: 'i' } 
  };
  return new Promise(async(resolve, reject) => {
    await products.find(searchCriteria).populate({ path: 'reviews', model: 'Review' }).skip(skip).limit(limit).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export function cityFilter(city, skip, limit) {
  const searchCriteria = {
    city: { $regex: `^${city}`, $options: 'i' } 
  };
  return new Promise(async(resolve, reject) => {
    await products.find(searchCriteria).populate({ path: 'reviews', model: 'Review' }).skip(skip).limit(limit).then((res)=>{
      console.log(res)
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export function priceFilter(min,max, skip, limit) {
  console.log(min)
  const searchCriteria = {
    price: { $gte: min, $lte: max } 
  };
  return new Promise(async(resolve, reject) => {
    await products.find(searchCriteria).populate({ path: 'reviews', model: 'Review' }).skip(skip).limit(limit).then((res)=>{
      console.log(res)
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}