import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title:{
      type:String,
      required:[true,"please add a title"]
    },
    price:{
      type:Number,
      required:[true,"please add a price"]
    },
    description:String,
    catagory:String,
    rating:Number,
    address:String,
    city:String,
    state:String,
    documents:Array,
    file:Array,
    reviews:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
      }
    ],
    reprots:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Report'
      }
    ],
    featured:{
      type:Array,
      default:[]
    }
  },
  {timestamps: true}
);

const Products = model("Products",productSchema,"products")

export default Products;