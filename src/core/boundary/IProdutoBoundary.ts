import { ProdutoEntity } from '@core';

export interface IProdutoBoundary {
  buscarProduto(idParceiro: string): Promise<ProdutoEntity[]>;
  salvarProduto(produto: ProdutoEntity): Promise<void>;
}
