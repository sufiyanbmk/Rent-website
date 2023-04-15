import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import crypto from 'crypto'
import jwt from "jsonwebtoken";
import { transport } from "../helpers/client/sentMail.js";
import { sendOtp, verifyOtp } from "../helpers/client/twilio.js";
import { uploadFile, getObjectSignedUrl, deleteFile } from '../services/awsS3.js'
import { resolve } from "path";
import { rejects } from "assert";
import { response } from "express";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

//user registration
export const register = async (req, res) => {
  const email = req.body.email;
  try {
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(409).json({ message: "email already exists", status: false });
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
    const user = User.create(newUser);
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
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.blocked === true) {
      return res
        .status(403)
        .json({ success: false, message: "Access Denied..." });
    }
    if(!user.verified){
      return res.status(401).json({success:false,message:"Please verify your gmail"})
    }
    //check password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(403)
        .json({ success: false, message: "Incorrect password..." });
    }
    if(user.profileImage){
      const imageUrl = await getObjectSignedUrl(user.profileImage);
      user.set("Imglink", imageUrl, { strict: false });
    }
    const { password, phone, ...rest } = user._doc;
    //create jwt token
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
    await User.updateOne({ _id: user._id }, { $set: { token } });
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        success: true,
        message: "successfully login",
        data: { phone, ...rest },
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

//sign in with google
export const signInWithGoogle = async (req, res) => {
  const email = req.body.email;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      if (!isUserExist.blocked) {
        const token = jwt.sign(
          { id: isUserExist._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "15d" }
        );
        await User.updateOne({ _id: isUserExist._id }, { $set: { token } });
        const { password, ...rest } = isUserExist._doc;
        res.status(200).json({
          success: true,
          message: "successfully login with Google",
          data: { ...rest },
        });
      } else {
        return res
        .status(403)
        .json({ success: false, message: "Access Denied..." });
      }
    } else {
      const { name, email } = req.body;
      const newUser = await User.create({ username: name, email });
      if (newUser) {
        //create jwt token
        const token = jwt.sign(
          { id: newUser._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "15d" }
        );
        await User.updateOne({ _id: newUser._id }, { $set: { token } });
        const updatedUser = await User.findOne({ _id: newUser._id });
        res
          .cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn,
          })
          .status(200)
          .json({
            success: true,
            message: "Created Account and Login With Google",
            data: updatedUser,
          });
      } else {
        return res
          .status(502)
          .json({ status: false, message: "Data base error ,try again" });
      }
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err });
  }
};

//forgot password
export const forgotPassword = async (req, res) => {
  const email = req.body.values.email;
  try {
    const result = await User.findOne({ email });
    if (result) {
      const secert = process.env.JWT_SECRET_KEY + result.password;
      const payload = {
        email: result.email,
        _id: result._id,
      };
      const token = jwt.sign(payload, secert, { expiresIn: "15m" });
      const link = `http://localhost:3000/reset-password/${result._id}/${token}`;
      const mailOpt = {
        from: "RENT <RENT@gmail.com>",
        to: "sufiyanbmk01@gmail.com",
        subject: "RESET PASSWORD",
        text: `Your Reset Password Link is:${link}`,
        html: `<hi>Your Reset Password Link is:${link}</h1>`,
      };
      let forgotemail = await transport(mailOpt);
      return res
        .status(200)
        .json({ status: true, message: "Please Check Email To Verify" });
    } else {
      return res
        .status(404)
        .json({ status: false, message: "Email is Not Registered" });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err });
  }
};

//reset password
export const resetPassword = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { id, token } = req.params;
    const { pass } = req.body;
    try {
      const user = await User.findById(id);
      if (user) {
        const secret = process.env.JWT_SECRET_KEY + user.password;
        const payload = jwt.verify(token, secret);
        if (payload.expired) {
          reject(payload);
        } else {
          const hashedPassword = await bcrypt.hash(pass, 10);
          await User.updateOne(
            { email: payload.email },
            { password: hashedPassword }
          );
          resolve(
            res.status(200).json({ success: true, message: "Password changed" })
          );
        }
      } else {
        reject({
          msg: "User Not Found",
        });
      }
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Failed to Change Password" });
    }
  });
};

//verify email
export const verifyEmail = async (req, res) => {
  const email = req.body.email;
  try {
    const result = await User.findOne({ email });
    if(result){
      return res.status(409).json({status:false,message:"Email already Exist choose Another"})
    }
    const secert = process.env.JWT_SECRET_KEY + email;
    const payload = {
      email: email,
    };
    const token = jwt.sign(payload, secert, { expiresIn: "45m" });
    const link = `http://localhost:3000/verify-mail/${token}/${email}`;
    const mailOpt = {
      from: "RENT <RENT@gmail.com>",
      to: "sufiyanbmk01@gmail.com",
      subject: "VERIFY EMAIL",
      text: `Your Verify Email Link is:${link}`,
      html: `<hi>Your Verify Email Link is:${link}</h1>`,
    };
    let verify = await transport(mailOpt);
    return res
        .status(200)
        .json({ status: true, message: "Please Check Email To Verify" });
  } catch (err) {
    return res.status(500).json({ status: false, message:'Server is Down. try again later' });
  }
};

//verify to login change status
export const verifyToLogin = async (req, res) => {
  const {token,email} = req.body;
  try{
    const result = await User.findOne({ email });
    if(!result){
      return res.status(404).json({success:false,message:"Account is not found"});
    }
    // const secert = process.env.JWT_SECRET_KEY + email;
    // const payload = verify(token, secert);
    // console.log(payload)
    // if(payload.expired){
    //   return res.status(401).json({status:false,message:"Your Access Denied ,contact help center"})
    // }
    await User.updateOne({_id:result._id},{$set: { verified: true }}).then(()=>{
      return res.status(200).json({success:true,message:'Account is verified'})
    }).catch((err)=>{
      res.status(502).json({success:false,message:'DataBase Error occured'})
    })
  }catch(err){
    res.status(500).json({status:false,message:'Server is down,please contact developer'})
  }
}

//otp login
export const otpLogin = async (req, res) => {
  const { values } = req.body;
  try {
    const phoneCheck = await User.findOne({ phone: values.phone });
    const phoneNumber = parseInt(values.phone);
    if (phoneNumber === phoneCheck?.phone) {
      sendOtp(phoneCheck.phone);
      const mobile = phoneCheck.phone;
      console.log(mobile);
      return res.json({ status: true, msg: "mobile number verified", mobile });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Number is not registered" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error, Try again Later" });
  }
};

export const otpVerify = async (req, res) => {
  const { mobile, otpNumber } = req.body;
  try {
    const userFind = await User.findOne({ phone: mobile });
    verifyOtp(otpNumber, mobile)
      .then((response) => {
        if (response.status) {
          res.json({ status: true, msg: response.msg, user: userFind });
        }
      })
      .catch((err) => {
        res.json({ status: false, msg: "Invalid otp" });
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

//profile image
export const  profileImg = async (req, res) =>{
  const userId = req.params.id
  try{
    const imageName = generateFileName()
    const fileBuffer = req.file.buffer;
    await uploadFile(fileBuffer, imageName, req.file.mimetype)
    const oldProduct = await User.findByIdAndUpdate({ _id: userId },{$set:{profileImage:imageName}})
    await deleteFile(oldProduct.profileImage)
    const imgLInk = await getObjectSignedUrl(imageName)
    res.status(200).json({success:true,message:'Image uploaded',data:imgLInk})
  }catch(err){
    res.status(500).json({success:false,message:'Server is down'})
  }
}

//edit profie
export const editProfile = async(req,res) =>{
  const userId = req.params.id
  const updateFields = req.body
  try{
    return new Promise(async (resolve,reject) =>{
      await User.updateOne({_id:userId}, { $set: updateFields }).then((response)=>{
        res.status(200).json({success:true,message:'Successfully updated'})
      }).catch((err)=>{
        res.status(501).json({success:false,message:'Database error'})
      })
    })
  }catch(err){
    res.status(500).json({success:false,message:'server down'})
  }
}