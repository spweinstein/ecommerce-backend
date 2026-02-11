import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address1: String,
  address2: String,
  city: String,
  region: String,
  postalCode: String,
  country: String,
});

const shopSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  address: {
    type: addressSchema,
  },

  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Industry",
    required: true,
  },
});
export default mongoose.model("Shop", shopSchema);
