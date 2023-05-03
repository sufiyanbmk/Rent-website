import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "please add a user name"],
  },
  email: {
    type: String,
    required: [true, "please add a email"],
    unique: true,
  },
  password: {
    type: String,
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  isblocked: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema, "users");

export default User;
