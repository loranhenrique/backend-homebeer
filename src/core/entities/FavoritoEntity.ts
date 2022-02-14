import { ParceiroEntity } from '@core';

export default class FavoritoEntity {
  public readonly idUsuario: string;
  public favoritos: ParceiroEntity[];

  public constructor(props: Partial<FavoritoEntity>) {
    Object.assign(this, props);
  }

  public static buscarFavorito(props: Partial<FavoritoEntity>): FavoritoEntity {
    return new FavoritoEntity(props);
  }
}
