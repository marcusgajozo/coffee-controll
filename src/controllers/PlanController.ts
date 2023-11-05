import { Request, Response } from "express";
import { PlanRepository } from "../repositories/PlanRepository";

const getAll = async (req: Request, res: Response) => {
  const plans = await PlanRepository.getAll();
  res.status(200).json(plans);
};

const getById = async (req: Request, res: Response) => {
  res.send("getById");
};

const update = async (req: Request, res: Response) => {
  res.send("update");
};

const create = async (req: Request, res: Response) => {
  res.send("create");
};

const deleteById = async (req: Request, res: Response) => {
  res.send("deleteById");
};

export const PlanController = {
  getAll,
  getById,
  update,
  create,
  deleteById,
};
