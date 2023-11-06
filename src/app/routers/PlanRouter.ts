import express from "express";
import { PlanController } from "../controllers/PlanController";

export const PlanRouter = express.Router();

PlanRouter.get("/", PlanController.getAll);

PlanRouter.get("/:id", PlanController.getById);

PlanRouter.post("/", PlanController.create);

PlanRouter.put("/:id", PlanController.update);

PlanRouter.delete("/:id", PlanController.deleteById);
