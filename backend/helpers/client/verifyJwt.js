import jwt from "jsonwebtoken";
import User from "../../models/userSchema.js";
import dotenv from 'dotenv'

dotenv.config()

const verifyJWT = async(req, res, next) => {
  const auth = req.cookies;
  console.log(auth,'ooo');
}

export default verifyJWT;