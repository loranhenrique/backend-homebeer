import { CarrinhoEntity } from '@core';

export interface ICarrinhoBoundary {
  buscarCarrinho(idUsuario: string): Promise<CarrinhoEntity>;
  salvarCarrinho(idUsuario: string, idProduto: string, idParceiro: string): Promise<void>;
}
