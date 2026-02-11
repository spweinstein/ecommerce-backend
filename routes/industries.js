import { Router } from "express";
import * as industryControllers from "../controllers/industryControllers.js";

const industriesRouter = Router();

industriesRouter.get("/", industryControllers.getIndustries);

export default industriesRouter;
