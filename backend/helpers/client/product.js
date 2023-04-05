import products from "../../models/productSchema.js"
import { deleteFile } from "../../services/awsS3.js"

export function addProduct(data,image,userId){
  console.log(image,'image')
  return new Promise(async(resolve,reject) =>{
    const newProduct = new products({
      userId:userId,
      productName: data.productName,
      price: data.price,
      category:data.category,
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
    console.log(product.file)
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

// export function searchProductHelper(){
//   return new Promise(async(resolve,reject)=>{

//   })
// }