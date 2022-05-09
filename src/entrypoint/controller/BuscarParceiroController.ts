import { BuscarParceiroUseCase, ParceiroEntity } from '@core';
import { IParceiroResponse } from '@entrypoint';
import { IParceiroRequest } from '../request';

export class BuscarParceiroController {
  public constructor(private usecase: BuscarParceiroUseCase) {}

  public async handle(queryParams: IParceiroRequest): Promise<IParceiroResponse[] | IParceiroResponse> {
    const idParceiroidUsuario: string = queryParams.idParceiro;
    const parceiros: ParceiroEntity[] = await this.usecase.execute();

    if (idParceiroidUsuario) {
      const parceiroEncontrado = parceiros.find((parceiro: ParceiroEntity) => parceiro.id === idParceiroidUsuario);

      return {
        id: parceiroEncontrado.id,
        nomeCompletoDono: parceiroEncontrado.nomeCompletoDono,
        email: parceiroEncontrado.email,
        celularDono: parceiroEncontrado.celularDono,
        imagemLoja: parceiroEncontrado.imagemLoja,
        nomeLoja: parceiroEncontrado.nomeLoja,
        descricaoLoja: parceiroEncontrado.descricaoLoja,
        categoria: parceiroEncontrado.categoria,
      };
    }

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
