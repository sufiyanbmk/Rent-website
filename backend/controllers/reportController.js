import Product from "../models/productSchema.js";
import Report from '../models/reportSchma.js'

export const createReport = async (req ,res ) =>{
  const proID = req.params.proId;
  const newReport = new Report({...req.body})
  try{
    const alredyReportedUser = await Report.find({userId:req.body.userId,proId:proID})
    
    if(alredyReportedUser.length > 0){
      return res.status(200).json({success:false,message:'You already reported'})
    }
    const savedReport = await newReport.save()
    await Product.findByIdAndUpdate(proId,{
      $push:{reports:savedReport._id}
    }).then((response)=>{
      return res.status(200).json({success:true,message:'success'})
    }).catch((err)=>{
      console.log(err)
    })
  }catch(err){
    console.log(err)
  }
}