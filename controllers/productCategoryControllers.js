import ProductCategory from "../models/productCategory.js";

// GET /productCategories?industry=industryId
export const getProductCategoriesByIndustry = async (req, res) => {
  try {
    const productCategories = await ProductCategory.find({
      industry: req.query.industry,
    });
    return res.status(200).json(productCategories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /productCategories
export const createProductCategory = async (req, res) => {
  try {
    const createdProductCategory = await ProductCategory.create(req.body);
    return res.status(201).json(createdProductCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
