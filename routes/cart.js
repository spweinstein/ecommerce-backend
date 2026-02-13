import { Router } from "express";
import * as cartControllers from "../controllers/cartControllers.js";

const cartRouter = Router();

cartRouter.get("/", cartControllers.getCart);
cartRouter.put("/:productId/add", cartControllers.addOneToCart);
cartRouter.put("/:productId/remove", cartControllers.removeOneFromCart);
cartRouter.delete("/:productId/clear", cartControllers.clearItemFromCart);
cartRouter.delete("/", cartControllers.clearCart);

export default cartRouter;
