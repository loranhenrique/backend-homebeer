import { BuscarParceiroUseCase, ParceiroEntity } from '@core';
import { IBuscarParceiroRequest, IParceiroResponse } from '@entrypoint';

export class BuscarParceiroController {
  public constructor(private usecase: BuscarParceiroUseCase) {}

  public async handle(queryParams: IBuscarParceiroRequest): Promise<IParceiroResponse[]> {
    const request: string = queryParams ? queryParams.idParceiro : '';
    const parceiros: ParceiroEntity[] = await this.usecase.execute(request);

    return parceiros.map((parceiro: ParceiroEntity) => ({
      id: parceiro.id,
      nomeCompletoDono: parceiro.nomeCompletoDono,
      email: parceiro.email,
      celularDono: parceiro.celularDono,
      imagemLoja: parceiro.imagemLoja,
      nomeLoja: parceiro.nomeLoja,
      descricaoLoja: parceiro.descricaoLoja,
    }));
  }
}
