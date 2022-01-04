export interface ICarrinhoResponse {
  idUsuario: string;
  compras: Array<{
    idParceiro: string;
    nomeParceiro: string;
    idProduto: string;
    nomeProduto: string;
    descricaoProduto: string;
    imagemProduto: string;
    precoProduto: number;
  }>;
}
