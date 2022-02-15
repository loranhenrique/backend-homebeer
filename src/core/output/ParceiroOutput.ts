import { ProdutoOutput } from '@core';

export interface ParceiroOutput {
  idParceiro: string;
  nomeParceiro: string;
  imagemParceiro: string;
  produtos: ProdutoOutput[];
  status: string;
}
