import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "ProductSchema",
    },
    userId: {
      type:mongoose.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);