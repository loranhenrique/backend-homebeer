import { BuscarFavoritoUseCase, FavoritoEntity, ParceiroEntity } from '@core';
import { IParceiroResponse, IUsuarioRequest } from '@entrypoint';

export class BuscarFavoritoController {
  public constructor(private usecase: BuscarFavoritoUseCase) {}

  public async handle(queryParams: IUsuarioRequest): Promise<IParceiroResponse[]> {
    const idUsuario: string = queryParams.idUsuario;
    const favorito: FavoritoEntity = await this.usecase.execute(idUsuario);

    return favorito.favoritos ? this.construirFavoritos(favorito.favoritos) : [];
  }

  private construirFavoritos(parceiros: ParceiroEntity[]): IParceiroResponse[] {
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
