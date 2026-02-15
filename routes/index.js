import { Router } from "express";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import shopsRouter from "./shops.js";
import productsRouter from "./products.js";
import industriesRouter from "./industries.js";
import productCategoriesRouter from "./productCategories.js";
import cartRouter from "./cart.js";
import ordersRouter from "./orders.js";
import verifyToken from "../middleware/verify-token.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/shops", shopsRouter);
router.use("/industries", industriesRouter);
router.use("/productCategories", productCategoriesRouter);
router.use("/cart", verifyToken, cartRouter);
router.use("/orders", verifyToken, ordersRouter);

export default router;
