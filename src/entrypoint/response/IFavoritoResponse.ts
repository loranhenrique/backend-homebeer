import { IParceiroResponse } from '@entrypoint';

export interface IFavoritoResponse {
  idUsuario: string;
  favoritos: IParceiroResponse[];
}
