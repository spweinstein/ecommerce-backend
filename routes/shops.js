import { Router } from "express";
import verifyToken from "../middleware/verify-token.js";
import * as shopControllers from "../controllers/shopControllers.js";
import {
  getShopOrders,
  getShopOrderById,
} from "../controllers/ordersControllers.js";
const shopsRouter = Router();

// GET /shops/
shopsRouter.get("/", shopControllers.getShops);
shopsRouter.get("/:shopId", shopControllers.getShopById);
shopsRouter.post("/", verifyToken, shopControllers.createShop);
shopsRouter.put("/:shopId", verifyToken, shopControllers.updateShop);
shopsRouter.delete("/:shopId", verifyToken, shopControllers.deleteShop);

// GET shop orders - for shop owner only
shopsRouter.get("/:shopId/orders", verifyToken, getShopOrders);
shopsRouter.get("/:shopId/orders/:orderId", verifyToken, getShopOrderById);

export default shopsRouter;
