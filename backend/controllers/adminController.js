import Product from "./../models/productSchema.js";

const admin={email:'admin@gmail.com',password:'123'}

export function adminLogin(req, res) {
  const { email, password,accessToken } = req.body.admin;
  if(email !== admin.email){
    console.log('err')
    return  res.status(401).json({success:false,massage: 'Invalid email',email:true})
  }
  if(password !== admin.password){
    res.status(401).json({success:false,massage: 'Invalid password',password:true})
  }
  if (email == admin.email && password == admin.password) {
    res.status(200).json({ success:true,massage: 'successfully logedIn' });
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
  
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};