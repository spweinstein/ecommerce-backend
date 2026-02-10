import { Router } from "express";
import verifyToken from "../middleware/verify-token.js";
import * as productControllers from "../controllers/productControllers.js";

const productsRouter = Router();

// GET /products/
productsRouter.get("/", productControllers.getProducts);
productsRouter.get("/:productId", productControllers.getProductById);
productsRouter.post("/", verifyToken, productControllers.createProduct);
productsRouter.put(
  "/:productId",
  verifyToken,
  productControllers.updateProduct,
);
productsRouter.delete(
  "/:productId",
  verifyToken,
  productControllers.deleteProduct,
);

export default productsRouter;
