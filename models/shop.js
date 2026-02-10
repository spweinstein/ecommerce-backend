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

  // industry: {
  //     ref: "Industry",
  //     required: true
  // }
});

// const industrySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });

// // const Industry = mongoose.model("Industry", industrySchema);

// const productCategorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },

//   industry: {
//     ref: "Industry",
//     required: true,
//   },
// });

// const ProductCategory = mongoose.model("Industry", industrySchema);

export default mongoose.model("Shop", shopSchema);
