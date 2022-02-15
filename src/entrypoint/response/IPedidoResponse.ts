export interface IPedidoResponse {
  numeroPedido: number;
  itensPedido: Array<{
    parceiro: {
      idParceiro: string;
      nomeParceiro: string;
      imagemParceiro: string;
      produtos: Array<{
        idProduto: string;
        nomeProduto: string;
        descricaoProduto: string;
        imagemProduto: string;
        precoProduto: number;
      }>;
      status: string;
    };
  }>;
}
