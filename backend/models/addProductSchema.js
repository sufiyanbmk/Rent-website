import mongoose from "mongoose";

const addProductSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email:String,
    contact: Number,
    address1: String,
    address2: String,
  },
  // { timestamps: true }
);

// const Product = ;
export default mongoose.model("addProduct", addProductSchema);