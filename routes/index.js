import { Router } from "express";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import productsRouter from "./products.js";
import shopsRouter from "./shops.js";
import verifyToken from "../middleware/verify-token.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/products", verifyToken, productsRouter);
router.use("/shops", verifyToken, shopsRouter);

export default router;
