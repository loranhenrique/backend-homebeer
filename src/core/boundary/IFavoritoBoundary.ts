import { FavoritoEntity } from '@core';

export interface IFavoritoBoundary {
  buscarFavorito(idUsuario: string): Promise<FavoritoEntity>;
  salvarFavorito(idUsuario: string, idParceiro: string): Promise<void>;
  deletarFavorito(idUsuario: string, idParceiro: string): Promise<void>;
}
