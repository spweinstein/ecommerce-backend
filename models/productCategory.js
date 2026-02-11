import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  industry: {
    ref: "Industry",
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
});

export default mongoose.model("ProductCategory", productCategorySchema);
