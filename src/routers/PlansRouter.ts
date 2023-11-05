import express from "express";
import { PlansController } from "../controllers/PlansController";

export const PlansRouter = express.Router();

PlansRouter.get("/", PlansController.getAll);

PlansRouter.get("/:id", PlansController.getById);

PlansRouter.post("/", PlansController.create);

PlansRouter.put("/:id", PlansController.update);

PlansRouter.delete("/:id", PlansController.deleteById);
