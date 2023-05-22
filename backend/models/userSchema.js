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
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    blocked:{
      type:Boolean,
      default:false,
    },
    verified:{
      type:Boolean,
      default:false,
    },
    socket_id: {
      type: String
    },
    status: {
      type: String,
      enum: ["Online", "Offline"]
    },
    token:String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema)