import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    userId:ObjectId,
    productName: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
    address:String,
    city:String,
    state:String,
    documents:Array,
    file:Array,
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reviewSchema",
      },
    ],
    reports: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reportSchema",
      },
    ],
  },
  { timestamps: true }
);

// const Product = ;
export default mongoose.model("Product", ProductSchema);