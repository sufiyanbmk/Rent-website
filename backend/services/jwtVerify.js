import jwt from "jsonwebtoken";
import User from '../models/userSchema.js'
require('dotenv').config();


const  verifyJWT = async(req, res, next) => {
  
  const auth = req.cookies;
  console.log(auth)
  console.log('reached')
  if (!auth.Ent) {
      return   res.sendStatus(401)
  } 
  const token = auth.Ent
  let result = await User.findOne({ accessToken: token }) 
  if (!result) {
      res.clearCookie('Ent', { httpOnly: true })
      return   res.sendStatus(401)
  }
  jwt.verify(
      token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
          if (err) {
              console.log(err);
              
              return res.sendStatus(403)
          }
          req.user = decoded.username;
          next()
      }
  )
 
}

export default verifyJWT;