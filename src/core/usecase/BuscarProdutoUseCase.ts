import { IParceiroBoundary, IProdutoBoundary, ParceiroEntity, ProdutoEntity } from '@core';

export default class BuscarProdutoUseCase {
  public constructor(private iProdutoBoundary: IProdutoBoundary, private iParceiroBoundary: IParceiroBoundary) {}

  public async execute(idParceiro: string): Promise<ProdutoEntity[]> {
    const existeErro: string = await this.validarParceiro(idParceiro);
    if (existeErro) throw new Error(existeErro);

    const produtosEntity: ProdutoEntity[] = await this.iProdutoBoundary.buscarProduto(idParceiro);
    if (!produtosEntity) return [];

    const produtosAtivos: ProdutoEntity[] = this.retirarProdutosInativos(produtosEntity);
    return produtosAtivos;
  }

  private async validarParceiro(idParceiro: string): Promise<string> {
    const parceiros: ParceiroEntity[] = await this.iParceiroBoundary.buscarParceiro();
    const parceiroEncontrado: ParceiroEntity = parceiros.find((parceiro: ParceiroEntity) => parceiro.id === idParceiro);
    if (!parceiroEncontrado) return 'Parceiro não foi encontrado.';
    if (!parceiroEncontrado.ativo) return 'Parceiro está inativo.';
    return '';
  }

  private retirarProdutosInativos(produtos: ProdutoEntity[]): ProdutoEntity[] {
    const produtosAtivos: ProdutoEntity[] = [];

    produtos.forEach((produto: ProdutoEntity) => {
      if (produto.ativo) produtosAtivos.push(produto);
    });

    return produtosAtivos;
  }
}
