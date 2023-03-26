import products from "../../models/productSchema.js"
export function addProduct(data,image,userId){
  console.log(image)
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