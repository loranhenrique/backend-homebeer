export default class CompraEntity {
  public readonly idProduto: string;
  public readonly ativoProduto: boolean;
  public readonly idParceiro: string;
  public readonly ativoParceiro: boolean;
  public imagemParceiro: string;
  public nomeParceiro: string;
  public imagemProduto: string;
  public nomeProduto: string;
  public descricaoProduto: string;
  public precoProduto: number;
  public status: string;

  public constructor(props: Partial<CompraEntity>) {
    Object.assign(this, props);
  }
}
