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
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  category: {
    ref: "ProductCategory",
    required: true,
  },
  shop: {
    ref: "Shop",
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
