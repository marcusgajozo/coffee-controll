import { Request, Response } from "express";
import { validate } from "class-validator";

import { PlanRepository } from "../repositories/PlanRepository";
import { PlanDTO } from "src/app/dtos/PlanDTO";

const getAll = async (req: Request, res: Response) => {
  const plans = await PlanRepository.getAll();
  res.status(200).json(plans);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const plan = await PlanRepository.getById(id);

    if (plan) {
      res.json(plan);
    } else {
      res.status(404).json({ message: "Plano não encontrado." });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao obter o plano.", error: error.message });
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData: PlanDTO = req.body;

  try {
    const updatedPlan = await PlanRepository.update(id, updatedData);

    if (updatedPlan) {
      res.json({ message: "Plano atualizado com sucesso.", updatedPlan });
    } else {
      res.status(404).json({ message: "Plano não encontrado." });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar o plano.", error: error.message });
  }
};

const create = async (req: Request, res: Response) => {
  const planData: PlanDTO = req.body;

  const errors = await validate(planData);

  if (errors.length > 0) {
    return res.status(400).json({ message: "Erro de validação", errors });
  }

  try {
    const createdPlan = await PlanRepository.create(planData);
    res.status(201).json(createdPlan);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao criar o plano.", error: error.message });
  }
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await PlanRepository.deleteById(id);

    if (deleted) {
      res.json({ message: "Plano excluído com sucesso." });
    } else {
      res.status(404).json({ message: "Plano não encontrado." });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao excluir o plano.", error: error.message });
  }
};

export const PlanController = {
  getAll,
  getById,
  update,
  create,
  deleteById,
};
