import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user registration
export const register = async (req, res) => {
  console.log(req.body)
  try {
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
    });
    console.log(newUser)
    // await newUser.save();
    const user = User.create(newUser)
    // console.log(user)
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
  console.log(req.body)
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    //if email doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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
