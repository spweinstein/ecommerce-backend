import { Router } from "express";
import verifyToken from "../middleware/verify-token.js";
import * as shopControllers from "../controllers/shopControllers.js";

const shopsRouter = Router();

// GET /shops/
shopsRouter.get("/", verifyToken, shopControllers.getShops);
shopsRouter.get("/:shopId", verifyToken, shopControllers.getShopById);
shopsRouter.post("/", verifyToken, shopControllers.createShop);
shopsRouter.put("/:shopId", verifyToken, shopControllers.updateShop);
shopsRouter.delete("/:shopId", verifyToken, shopControllers.deleteShop);

export default shopsRouter;
