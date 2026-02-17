import { Router } from "express";
import * as ordersControllers from "../controllers/ordersControllers.js";

const ordersRouter = Router();

// /POST/orders
// Submit + clear cart
// Save cart as new order
// ordersRouter.post("/", ordersControllers.submitOrder);

// GET /orders
// Get all of a user's orders
ordersRouter.get("/", ordersControllers.getUserOrders);

// GET /orders/:orderId
// Get specific order's details
ordersRouter.get("/:orderId", ordersControllers.getOrderById);

export default ordersRouter;
