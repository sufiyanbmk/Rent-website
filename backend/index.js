import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import checkForExpire from './utils/schedulte.js';
import http from 'http'

import authRoute from "./routes/userAuth.js"
import admin from "./routes/admin.js";
import userRoute from "./routes/product.js";
import reviewRoute from "./routes/review.js";
import reportRoute from "./routes/report.js";
import featuredProductRoute from './routes/featuredProduct.js'
import chatRoute from './routes/chat.js'
import callRoute from './routes/audioCall.js'

import { Server } from "socket.io";
import socketManager from "./socket/socketManger.js";

dotenv.config()
const app = express()
const port = process.env.PORT || 8001;
const server = http.createServer(app)

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

checkForExpire()
app.use("/admin",admin)
app.use("/",authRoute);
app.use('/product',userRoute)
app.use('/review',reviewRoute)
app.use('/report',reportRoute)
app.use('/featured',featuredProductRoute)
app.use('/chat',chatRoute)
app.use('/call',callRoute)



const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

socketManager(io);

server.listen(port , ()=> {
  connect();
  console.log('server running on', port)
})