import { Signature } from "../entities/Signature";
import { myDataSource } from "../../database/data-source";

export const disableExpiredSubscriptions = async () => {
  try {
    const signatures = await myDataSource
      .getRepository(Signature)
      .createQueryBuilder("signature")
      .where("signature.active = :active", { active: true })
      .getMany();

    const hoje = new Date();

    for (const signature of signatures) {
      const dataExpiracao = new Date(signature.create_at);
      dataExpiracao.setMonth(
        dataExpiracao.getMonth() + signature.durationMonths
      );

      if (hoje > dataExpiracao) {
        // A assinatura expirou, desative-a
        signature.active = false;
        await myDataSource.getRepository(Signature).save(signature);
        console.log(`Assinatura ${signature.id} expirada. Desativada.`);
      }
    }
  } catch (error) {
    console.error("Erro ao desativar assinaturas expiradas:", error);
  }
};
