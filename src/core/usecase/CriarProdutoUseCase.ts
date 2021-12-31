import { IParceiroBoundary, IProdutoBoundary, ParceiroEntity, ProdutoEntity } from '@core';
import { ICriarProdutoRequest } from '@entrypoint';

export default class CriarProdutoUseCase {
  public constructor(private iProdutoBoundary: IProdutoBoundary, private iParceiroBoundary: IParceiroBoundary) {}

  public async execute(request: ICriarProdutoRequest): Promise<void> {
    const parceiroExiste: ParceiroEntity = await this.validarParceiro(request.idParceiro);
    if (!parceiroExiste) throw new Error('Parceiro não existe.');
    const produtoEntity = ProdutoEntity.criarProduto(request);
    await this.iProdutoBoundary.salvarProduto(produtoEntity);
  }

  private async validarParceiro(idParceiro: string): Promise<ParceiroEntity> {
    const parceiros: ParceiroEntity[] = await this.iParceiroBoundary.buscarParceiro();
    const parceiroEncontrado: ParceiroEntity = parceiros.find((parceiro: ParceiroEntity) => parceiro.id === idParceiro);
    return parceiroEncontrado;
  }
}
