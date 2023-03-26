import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    userId:ObjectId,
    productName: String,
    price: Number,
    description: String,
    category: String,
    documents:String,
    rating: Number,
    supply: Number,
    address:String,
    city:String,
    state:String,
    documents:String,
    file:Array
  },
  // { timestamps: true }
);

// const Product = ;
export default mongoose.model("Product", ProductSchema);