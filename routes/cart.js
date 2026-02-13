import { Router } from "express";
import * as cartControllers from "../controllers/cartControllers.js";

const cartRouter = Router();

cartRouter.get("/", cartControllers.getCart);
cartRouter.put("/:productId/add", cartControllers.addToCart);
cartRouter.put("/:productId/remove", cartControllers.removeFromCart);
cartRouter.delete("/", cartControllers.clearCart);

export default cartRouter;
