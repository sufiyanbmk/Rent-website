import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone:{
      type:Number,
    },
    profileImage:{
      type:String,
    },
    blocked:{
      type:Boolean,
      default:false,
    },
    verified:{
      type:Boolean,
      default:false,
    },
    token:String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema)