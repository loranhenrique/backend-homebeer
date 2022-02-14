import { IParceiro, IUsuario } from '@database';

export interface IFavorito {
  usuario: IUsuario;
  parceiro: IParceiro;
}
