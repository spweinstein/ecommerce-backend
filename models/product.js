import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
  },
  length: {
    type: Number,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  //   category: {
  //     ref: "ProductCategory",
  //     required: true,
  //   },
  //   shop: {
  //     ref: "Shop",
  //     required: true,
  //   },
});

export default mongoose.model("Product", productSchema);
