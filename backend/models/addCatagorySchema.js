import mongoose from "mongoose";

const addCatagorySchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

// const Product = ;
export default mongoose.model("catagory", addCatagorySchema);