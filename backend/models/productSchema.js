import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
    address:String,
    city:String,
    documents:String,
    image:String
  },
  // { timestamps: true }
);

// const Product = ;
export default mongoose.model("Product", ProductSchema);