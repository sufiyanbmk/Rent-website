import Product from "../models/productSchema.js";
import Review from "../models/reviewSchema.js";

export const createReview = async (req ,res ) =>{
  const proId = req.params.proId;
  const newReview = new Review({...req.body})
  try{
    const savedReview = await newReview.save()

    await Product.findByIdAndUpdate(proId,{
      $push:{reviews:savedReview._id}
    }).then((response)=>{
      console.log(response)
    }).catch((err)=>{
      console.log(err)
    })
  }catch(err){
    console.log(err)
  }
}