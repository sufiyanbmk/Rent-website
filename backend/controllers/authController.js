import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transport } from '../helpers/client/sentMail.js';


//user registration
export const register = async (req, res) => {
  try {
    const emailCheck = await User.findOne({email})
    if(emailCheck){
        return res.json({msg:"email already exists",status:false})
    }
   
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
    });
    const user = User.create(newUser)
    console.log('hiiiiiii')

    res.status(200).json({ success: true, message: "User created" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to signin . Try again" });
  }
};

//user login
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    console.log(user)
    //if email doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if(user.blocked===true){
      return res.json({msg:"You are not allowed",status:false})
  }
    //check password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect password" });
    }
    const { password, phone, ...rest } = user._doc;
    //create jwt token
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
    //set tokens to browser cookies and send response to the user
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "successfully login",
        data: { ...rest },
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

//forgot password
export const forgotPassword = async (req,res) => {
  const email = req.body.email
  try{
    const result = await User.findOne({email})
    if(result){
      const secert = process.env.JWT_SECRET_KEY + result.password;
      const payload = {
        email: result.email,
        _id: result._id
      }
      const token = jwt.sign(payload,secert,{expiresIn: '15m'})
      const link = `http://localhost:3000/reset-password/${result._id}/${token}`;
      const mailOpt = {
        from: 'RENT <RENT@gmail.com>',
        to: 'sufiyanbmk@gmail.com',
        subject: 'RESET PASSWORD',
        text: `Your Reset Password Link is:${link}`,
        html: `<hi>Your Reset Password Link is:${link}</h1>`,
      };
      let forgotemail = await transport(mailOpt)
      return res.status(200).json({status:true,msg:'Check Email...'})
    }else{
      return res.status(401).json({status:false,msg:'Error Occured.try again'})
    }
  }catch(err){
    return res.status(401).json({ ...err, status: false });
  }
 
}

//reset password

export const resetPassword = async(req,res) => {
  return new Promise(async (resolve,reject)=> {
    const { id, token } = req.params;
    const { pass } = req.body;
    try{
      const user = await User.findById(id)
      if (user) {
        const secret = process.env.JWT_SECRET_KEY + user.password;
        const payload=jwt.verify(token,secret)
        if(payload.expired){
            reject(payload)
        }else{
            const hashedPassword = await bcrypt.hash(pass, 10)
            await User.updateOne({email:payload.email},{password:hashedPassword})
            resolve(res.status(200).json({ success: true, message: "Password changed" }))
        }
    } else {
      reject({
        msg: 'User Not Found',
      });
    }
    }catch(err){
      console.log(err)
      res.status(500).json({ success: false, message: "Failed to Change Password" });
    }
  })
 
}