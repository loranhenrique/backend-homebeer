import { BuscarFavoritoUseCase, FavoritoEntity, ParceiroEntity } from '@core';
import { IFavoritoResponse, IUsuarioRequest } from '@entrypoint';

export class BuscarFavoritoController {
  public constructor(private usecase: BuscarFavoritoUseCase) {}

  public async handle(queryParams: IUsuarioRequest): Promise<IFavoritoResponse> {
    const idUsuario: string = queryParams.idUsuario;
    const favorito: FavoritoEntity = await this.usecase.execute(idUsuario);

    return {
      idUsuario: favorito.idUsuario,
      favoritos: favorito.favoritos ? this.construirFavoritos(favorito.favoritos) : [],
    };
  }

  private construirFavoritos(compras: ParceiroEntity[]): any {
    return compras.map((item: ParceiroEntity) => ({
      idParceiro: item.id,
      imagemParceiro: item.imagemLoja,
      nomeParceiro: item.nomeLoja,
      descricaoParceiro: item.descricaoLoja,
    }));
  }
}
