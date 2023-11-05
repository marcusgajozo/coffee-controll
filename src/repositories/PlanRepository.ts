import { myDataSource } from "../database/data-source";
import { Plan } from "../entities/Plan";

const repository = myDataSource.getRepository(Plan);

const getAll = async () => {
  return await repository.find();
};

const getById = async () => {
  return await repository.find();
};

const create = async () => {
  return await repository.create();
};

const update = async () => {
  // pesquisar como atualizar dados usando o typeORM
};

export const PlanRepository = {
  getAll,
};
