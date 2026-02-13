import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },

  // shop: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Shop",
  // },

  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  items: [cartItemSchema],
});

export default mongoose.model("Cart", cartSchema);
