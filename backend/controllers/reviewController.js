import Product from "../models/productSchema.js";
import Review from "../models/reviewSchema.js";

export const createReview = async (req ,res ) =>{
  const proID = req.params.proId;
  const newReview = new Review({...req.body})
  try{
    const alreadyReviewedUser = await Review.find({userId:req.body.userId, proId:proID})
    console.log(alreadyReviewedUser)
    if(alreadyReviewedUser.length > 0){
      return res.status(409).json({success:false,message:'You already reviewed'})
    }
    const savedReview = await newReview.save()
    await Product.findByIdAndUpdate(proID,{
      $push:{reviews:savedReview._id}
    }).then((response)=>{
      return res.status(200).json({success:true,message:'success'})
    }).catch((err)=>{
      console.log(err)
    })
  }catch(err){
    console.log(err)
  }
}