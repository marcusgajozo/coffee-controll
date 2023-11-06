import { PlanDTO } from "src/app/dtos/PlanDTO";
import { myDataSource } from "../../database/data-source";
import { Plan } from "../entities/Plan";

const repository = myDataSource.getRepository(Plan);

const getAll = async () => {
  return await repository.find();
};

const getById = async (id: string) => {
  return await repository.findOne({ where: { id } });
};

const create = async (planData: PlanDTO) => {
  return await repository.save(planData);
};

const update = async (id: string, planData: PlanDTO) => {
  const existingPlan = await repository.findOne({ where: { id } });

  if (existingPlan) {
    repository.merge(existingPlan, planData);
    return await repository.save(existingPlan);
  }

  return null;
};

const deleteById = async (id: string) => {
  const existingPlan = await repository.findOne({ where: { id } });

  if (existingPlan) {
    await repository.remove(existingPlan);
    return true;
  }

  return false;
};

export const PlanRepository = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
