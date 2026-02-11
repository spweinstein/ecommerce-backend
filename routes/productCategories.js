import { Router } from "express";
import * as productCategoryControllers from "../controllers/productCategoryControllers.js";

const productCategoriesRouter = Router();

productCategoriesRouter.get(
  "/",
  productCategoryControllers.getProductCategoriesByIndustry,
);
productCategoriesRouter.post(
  "/",
  productCategoryControllers.createProductCategory,
);

export default productCategoriesRouter;
