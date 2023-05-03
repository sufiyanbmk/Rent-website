import Product from "../models/productSchema.js";
import Report from '../models/reportSchma.js'

export const createReport = async (req ,res ) =>{
  const proID = req.params.proId;
  try{
    const alredyReportedUser = await Report.find({userId:req.body.userId,productId:proID})
    const newReport = new Report({...req.body,productId:proID})
    console.log(alredyReportedUser)
    
    if(alredyReportedUser.length > 0){
      console.log('idisfisfdj')
      return res.status(200).json({success:false,message:'You already reported'})
    }
    const savedReport = await newReport.save()
    await Product.findByIdAndUpdate(proID,{
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