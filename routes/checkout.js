import { Router } from "express";
import * as checkoutControllers from "../controllers/checkoutControllers.js";

const checkoutRouter = Router();

checkoutRouter.post("/validate", checkoutControllers.validateCheckout);
checkoutRouter.post("/submit", checkoutControllers.submitCheckout);
export default checkoutRouter;
