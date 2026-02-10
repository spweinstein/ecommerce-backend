import { Router } from "express";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import shopsRouter from "./shops.js";
import productsRouter from "./products.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/shops", shopsRouter);

export default router;
