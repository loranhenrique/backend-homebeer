import { CarrinhoEntity } from '@core';

export interface ICarrinhoBoundary {
  buscarCarrinho(idParceiro: string): Promise<CarrinhoEntity>;
  salvarCarrinho(_idUsuario: string, _idProduto: string, _idParceiro: string): Promise<void>;
}
