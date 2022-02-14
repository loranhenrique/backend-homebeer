import { SalvarFavoritoUseCase } from '@core';
import { ISalvarFavoritoRequest } from '@entrypoint';

export class SalvarFavoritoController {
  public constructor(private usecase: SalvarFavoritoUseCase) {}

  public async handle(queryParams: unknown, body: any): Promise<void> {
    const favorito: ISalvarFavoritoRequest = body;
    await this.usecase.execute(favorito.idUsuario, favorito.idParceiro);
  }
}
