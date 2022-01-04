import { IParceiro, IProduto, IUsuario } from '@database';

export interface ICarrinho {
  usuario: IUsuario;
  produto: IProduto;
  parceiro: IParceiro;
}
