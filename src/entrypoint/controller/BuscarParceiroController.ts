import { BuscarParceiroUseCase, ParceiroEntity } from '@core';
import { IParceiroResponse } from '@entrypoint';

export class BuscarParceiroController {
  public constructor(private usecase: BuscarParceiroUseCase) {}

  public async handle(): Promise<IParceiroResponse[]> {
    const parceiros: ParceiroEntity[] = await this.usecase.execute();

    return parceiros.map((parceiro: ParceiroEntity) => ({
      id: parceiro.id,
      nomeCompletoDono: parceiro.nomeCompletoDono,
      email: parceiro.email,
      celularDono: parceiro.celularDono,
      imagemLoja: parceiro.imagemLoja,
      nomeLoja: parceiro.nomeLoja,
      descricaoLoja: parceiro.descricaoLoja,
      categoria: parceiro.categoria,
    }));
  }
}
