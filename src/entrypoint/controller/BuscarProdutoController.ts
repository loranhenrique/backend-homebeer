import { BuscarProdutoUseCase, ProdutoEntity } from '@core';
import { IParceiroRequest, IProdutoResponse } from '@entrypoint';

export class BuscarProdutoController {
  public constructor(private usecase: BuscarProdutoUseCase) {}

  public async handle(queryParams: IParceiroRequest): Promise<IProdutoResponse[]> {
    const idParceiro: string = queryParams.idParceiro;
    const produtos: ProdutoEntity[] = await this.usecase.execute(idParceiro);

    return produtos.map((produto: ProdutoEntity) => ({
      idParceiro: produto.idParceiro,
      id: produto.id,
      imagem: produto.imagem,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
    }));
  }
}
