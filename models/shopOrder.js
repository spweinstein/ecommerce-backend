import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },

  quantity: {
    type: Number,
    required: true,
  },

  unitPrice: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

const shopOrderSchema = new mongoose.Schema(
  {
    userOrder: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserOrder",
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },

    items: [orderItemSchema],

    subtotal: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    shippingMethod: String,
    shippingTotal: Number,
    shippingSpeed: String,
    taxTotal: Number,
    grandTotal: Number,
  },
  { timestamps: true },
);

export default mongoose.model("ShopOrder", shopOrderSchema);
