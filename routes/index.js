import { Router } from "express";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import shopsRouter from "./shops.js";
import productsRouter from "./products.js";
import industriesRouter from "./industries.js";
import productCategoriesRouter from "./productCategories.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/shops", shopsRouter);
router.use("/industries", industriesRouter);
router.use("/productCategories", productCategoriesRouter);

export default router;
