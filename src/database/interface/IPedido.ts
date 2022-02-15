import { IParceiro, IProduto, IUsuario } from '@database';

export interface IPedido {
  identificadorPedido: string;
  usuario: IUsuario;
  parceiro: IParceiro;
  produto: IProduto;
  status: string;
}
