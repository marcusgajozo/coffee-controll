import { Request, Response, NextFunction } from "express";

const getAll = async (req: Request, res: Response) => {
  res.send("getAll");
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

export const PlansController = {
  getAll,
  getById,
  update,
  create,
  deleteById,
};
