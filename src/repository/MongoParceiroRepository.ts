import { IParceiroBoundary, ParceiroEntity } from '@core';
import { IParceiro, ParceiroModel } from '@database';

export class MongoParceiroRepository implements IParceiroBoundary {
  public async buscarParceiro(): Promise<ParceiroEntity[]> {
    const parceiros: IParceiro[] = await ParceiroModel.find();

    if (!parceiros) return [];

    return parceiros.map((parceiro: IParceiro) => ({
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
      categoria: parceiro.categoria,
    }));
  }

  public async salvarParceiro(parceiro: ParceiroEntity): Promise<void> {
    await ParceiroModel.create({ ...parceiro, _id: parceiro.id });
  }
}
