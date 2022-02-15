import { PedidoEntity } from '@core';

export interface IPedidoBoundary {
  buscarPedido(idUsuario: string): Promise<PedidoEntity[]>;
  salvarPedido(idUsuario: string, idProduto: string, idParceiro: string, idPedido: string): Promise<void>;
  deletarPedido(idUsuario: string, idParceiro: string): Promise<void>;
}
