import { IParceiroBoundary, ParceiroEntity } from '@core';
import { ParceiroModel } from '@database';

export class MongoParceiroRepository implements IParceiroBoundary {
  public async buscarParceiro(cnpj: number): Promise<ParceiroEntity> {
    const parceiro = await ParceiroModel.findOne({ cnpj });

    if (!parceiro) return null;

    return {
      id: parceiro._id,
      ativo: parceiro.ativo,
      nomeCompletoDono: parceiro.nomeCompletoDono,
      email: parceiro.email,
      senha: parceiro.senha,
      celularDono: parceiro.celularDono,
      imagemLoja: parceiro.imagemLoja,
      nomeLoja: parceiro.nomeLoja,
      descricaoLoja: parceiro.descricaoLoja,
      cnpj: parceiro.cnpj,
    };
  }

  public async salvarParceiro(parceiro: ParceiroEntity): Promise<void> {
    await ParceiroModel.create({ ...parceiro, _id: parceiro.id });
  }
}
