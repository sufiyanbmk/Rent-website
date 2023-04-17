import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import authRoute from "./routes/userAuth.js"
import admin from "./routes/admin.js";
import userRoute from "./routes/product.js";
import reviewRoute from "./routes/review.js";

dotenv.config()
const app = express()
const port = process.env.PORT || 8001;

//database connection
mongoose.set('strictQuery',false);
const connect = async() => {
  try {
      await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser:true,
          // useUnifinedTopology:true
      })
      console.log("Mongodb database connected")
  } catch (err) {
      console.log(err)
      console.log('Error in connecting mongodb')
  }
}

//middleware
app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true
}))
app.use(cookieParser());

app.use("/admin",admin)
app.use("/",authRoute);
app.use('/product',userRoute)
app.use('/review',reviewRoute)


app.listen(port , ()=> {
  connect();
  console.log('server running on', port)
})