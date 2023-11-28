import { Signature } from "../entities/Signature";
import { SignatureRepository } from "../repositories/SignatureRepository";
import * as yup from "yup";
import { planService } from "./planService";

const bodyValidation = yup.object().shape({
  active: yup.boolean().required(),
  id_user: yup.string().required(),
  plan: yup.string().required(),
  durationMonths: yup.number().required(),
});

const getAll = async () => {
  try {
    return await SignatureRepository.getAll();
  } catch (error: any) {
    throw new Error(error?.message || "Erro ao buscar todas as assinaturas.");
  }
};

const getById = async (id: string) => {
  try {
    return await SignatureRepository.getById(id);
  } catch (error: any) {
    throw new Error(error?.message || "Erro ao buscar assinatura por id.");
  }
};

const update = async (id: string, signatureData: Partial<Signature>) => {
  try {
    await bodyValidation.validate(signatureData);
    return await SignatureRepository.update(id, signatureData);
  } catch (error: any) {
    throw new Error(error?.message || "Erro ao atualizar assinatura.");
  }
};

const create = async (signatureData: Partial<Signature>, planId: string) => {
  try {
    await bodyValidation.validate(signatureData);
    const plan = await planService.getById(planId);
    if (plan !== null) {
      return await SignatureRepository.create(signatureData);
    } else {
      throw new Error("Plano não encontrado!");
    }
  } catch (error: any) {
    throw new Error(error?.message || "Erro ao criar assinatura.");
  }
};

const deleteById = async (id: string) => {
  try {
    return await SignatureRepository.deleteById(id);
  } catch (error: any) {
    throw new Error(error?.message || "Erro ao deletar assinatura.");
  }
};

const cancelSubscription = async (id: string) => {
  try {
    const signature = getById(id);
    if (signature !== null) {
      const updatedSignature = { ...signature, active: false };
      return SignatureRepository.update(id, updatedSignature);
    }
  } catch (error: any) {
    throw new Error(error?.message || "Erro ao cancelar assinatura.");
  }
};

export const signatureService = {
  getAll,
  getById,
  update,
  create,
  deleteById,
  cancelSubscription,
};
