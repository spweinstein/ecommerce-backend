import Product from "../models/product.js";

const getProducts = async (req, res) => {
  try {
    const query = {};
    if (req.query?.shopId) {
      query.shop = req.query.shopId;
    }
    // console.log(query);
    const products = await Product.find(query).populate("shop"); //.populate("category")
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
      // .populate("category")
      .populate("shop");
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    req.body.user = req.user._id;
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product.user.equals(req.user._id)) {
      return res.status(403).json({ error: "Permission denied" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true, runValidators: true },
    )
      // .populate("category")
      .populate("shop");
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product.user.equals(req.user._id)) {
      return res.status(403).json({ error: "Permission denied" });
    }
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId,
    );
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
