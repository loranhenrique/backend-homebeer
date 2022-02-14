import { IParceiro, IProduto, IUsuario } from '@database';

export interface IPedido {
  usuario: IUsuario;
  parceiro: IParceiro;
  produto: IProduto;
  status: string;
}
