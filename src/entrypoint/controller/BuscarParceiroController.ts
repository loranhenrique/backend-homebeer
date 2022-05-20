import { BuscarFavoritoUseCase, BuscarParceiroUseCase, FavoritoEntity, ParceiroEntity } from '@core';
import { IParceiroResponse } from '@entrypoint';
import { IParceiroRequest } from '../request';

export class BuscarParceiroController {
  public constructor(private usecase: BuscarParceiroUseCase, private useCaseFavorito: BuscarFavoritoUseCase) {}

  public async handle(queryParams: IParceiroRequest): Promise<IParceiroResponse[] | IParceiroResponse> {
    const request: IParceiroRequest = queryParams;
    const parceiros: ParceiroEntity[] = await this.usecase.execute();

    if (request.idParceiro && request.idUsuario) {
      const favoritos: FavoritoEntity = await this.useCaseFavorito.execute(request.idUsuario);
      const parceiroEncontrado = parceiros.find((parceiro: ParceiroEntity) => parceiro.id === request.idParceiro);
      const favoritoEncontrado = favoritos.favoritos.find(
        (favorito: ParceiroEntity) => favorito.id === request.idParceiro,
      );

      return {
        id: parceiroEncontrado.id,
        nomeCompletoDono: parceiroEncontrado.nomeCompletoDono,
        email: parceiroEncontrado.email,
        celularDono: parceiroEncontrado.celularDono,
        imagemLoja: parceiroEncontrado.imagemLoja,
        nomeLoja: parceiroEncontrado.nomeLoja,
        descricaoLoja: parceiroEncontrado.descricaoLoja,
        categoria: parceiroEncontrado.categoria,
        favorito: favoritoEncontrado ? true : false,
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
