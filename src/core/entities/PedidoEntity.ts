export default class PedidoEntity {
  public identificadorPedido: string;
  public idParceiro: string;
  public ativoParceiro: boolean;
  public imagemParceiro: string;
  public nomeParceiro: string;
  public idProduto: string;
  public ativoProduto: boolean;
  public nomeProduto: string;
  public descricaoProduto: string;
  public imagemProduto: string;
  public precoProduto: number;
  public status: string;

  public constructor(props: Partial<PedidoEntity>) {
    Object.assign(this, props);
  }

  public static buscarPedido(props: Partial<PedidoEntity>): PedidoEntity {
    return new PedidoEntity(props);
  }
}
