import { IParceiroBoundary, IProdutoBoundary, ParceiroEntity, ProdutoEntity } from '@core';
import { ICriarProdutoRequest } from '@entrypoint';

export default class CriarProdutoUseCase {
  public constructor(private iProdutoBoundary: IProdutoBoundary, private iParceiroBoundary: IParceiroBoundary) {}

  public async execute(request: ICriarProdutoRequest): Promise<void> {
    const existeErro: string = await this.validarParceiro(request.idParceiro);
    if (existeErro) throw new Error(existeErro);

    const produtoEntity = ProdutoEntity.criarProduto(request);
    await this.iProdutoBoundary.salvarProduto(produtoEntity);
  }

  private async validarParceiro(idParceiro: string): Promise<string> {
    const parceiros: ParceiroEntity[] = await this.iParceiroBoundary.buscarParceiro();
    const parceiroEncontrado: ParceiroEntity = parceiros.find((parceiro: ParceiroEntity) => parceiro.id === idParceiro);
    if (!parceiroEncontrado) return 'Parceiro não foi encontrado.';
    if (!parceiroEncontrado.ativo) return 'Parceiro está inativo.';
    return '';
  }
}
