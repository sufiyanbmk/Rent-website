import userSchema from "../models/userSchema.js";
import addProduct from "./../models/addProductSchema.js";
import Product from '../models/productSchema.js'
import addCatagorySchema from "../models/addCatagorySchema.js";
import Report from '../models/reportSchma.js'
const admin={email:'admin@gmail.com',password:'123'}

export const adminLogin = async(req, res) => {
  const { email, password,accessToken } = req.body.admin;
  if(email !== admin.email){
    console.log('err')
    return  res.status(401).json({success:false,massage: 'Invalid email',email:true})
  }
  if(password !== admin.password){
    res.status(401).json({success:false,massage: 'Invalid password',password:true})
  }
  if (email == admin.email && password == admin.password) {
    res.status(200).json({ success:true,message: 'successfully logedIn' });
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({ path: 'reviews', model: 'Review' });
  
    res.status(200).json({success: true,message: "Succesfull", data: products});
  } catch (error) {
    res.status(404).json({ success:false,message: error.message });
  }
};

export const addProducts = async (req, res) => {
  try {
    console.log(req.body)
    // const products = await Product.find();
    const newProduct = new addProduct({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      address1: req.body.address1,
      address2: req.body.address2,
    });
    console.log(newProduct)
    const product = addProduct.create(newProduct)
    res.status(200).json({ success: true, message: "Product Added" });
    // res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCatagory = async (req, res) => {
  try {
    const catagory = await addCatagorySchema.find();
  
    res.status(200).json({success: true,message: "Succesfull", data: catagory});
  } catch (error) {
    res.status(404).json({ success:false,message: error.message });
  }
};


export const addCatagory = async (req, res) => {
  try {
    console.log(req.body)
    // const products = await Product.find();
    const newCatagory = new addCatagorySchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    // console.log(newCatagory)
    const catagory = addCatagorySchema.create(newCatagory)
    res.status(200).json({ success: true, message: "Product Added" });
    // res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//users
export const getUsers = async (req, res) => {
  try {
    const users = await userSchema.find();
  
    res.status(200).json({success: true,message: "Succesfull", data: users});
  } catch (error) {
    res.status(404).json({ success:false,message: error.message });
  }
};

export const blockUser = async (req, res) => {
  const { email,block } = req.body;
  try {
    const users = await userSchema.findOne({email});
    if(users.blocked === false){
      users.blocked = true
    }else{
      users.blocked = false
    }
    await users.save(); 
    res.status(200).json({success: true,message: "Succesfull"});
  } catch (error) {
    res.status(404).json({ success:false,message: error.message });
  }
};

//reported post

export const reportedProduct = async(req,res) => {
  try{
    const result = await Product.find({
      $where: "this.reports.length === 1"
    }).populate({
      path: "reports",
      select: "username report",
      model: "Report"
    }).select("productName reports");
    res.status(200).json({success: true,message: "Succesfull",data:result});
  } catch(err){
    res.status(404).json({ success:false,message: err.message });
  }
}

export const deleteProduct = async(req,res) => {
  try{
    await Product.findByIdAndDelete({_id:req.params.id}).then(async(result)=>{
      await Report.deleteMany({ productId: result._id }).then((resu)=>{
        console.log(resu)
      })
      res.status(200).json({success: true,message: "Succesfull deleted"});
    })
  }catch(err){
    console.log(err)
    res.status(500).json({ success:false,message: err.message });
  }
}

export const getDashboardData = async( req,res ) => {
  try{
    const [usercount, blockedCount, verifiedCount ] =
      await Promise.all([
        userSchema.countDocuments(),
        userSchema.countDocuments({ blocked: true }),
        userSchema.countDocuments({ verified: true }),
      ]);

    const data = { usercount, blockedCount, verifiedCount };
    res.status(200).json({success: true,message: "Succesfull", data: data});
  }catch(err){
    res.status(404).json({ success:false,message: err.message });
  }
}

export const getUserGraph = async(req,res) => {
  try{
    const users = await userSchema.find()
    res.status(200).json({success: true,message: "Succesfull", data: users});
  }catch(err){
    res.status(404).json({ success:false,message: err.message });
  }
}

export const getProductGraph = async(req,res) => {
  try{
    const product = await Product.find()
    res.status(200).json({success: true,message: "Succesfull", data: product});
  }catch(err){
    res.status(404).json({ success:false,message: err.message });
  }
}

export const pieChartProduct = async(req,res) => {
  try{
    const featuredProduct = await Product.countDocuments({featured:{ $exists: true, $ne: [] }})
    const product  = await Product.countDocuments({featured: { $exists: false, $not: {$gt: 0} }})
    console.log(product);
    res.status(200).json({success: true,message: "Succesfull", data: {product:product,featuredProduct:featuredProduct}});
  }catch(err){
    res.status(404).json({ success:false,message: err.message });
  }
}