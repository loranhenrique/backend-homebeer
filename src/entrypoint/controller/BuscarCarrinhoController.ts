import { BuscarCarrinhoUseCase, CarrinhoEntity, CompraEntity } from '@core';
import { ICarrinhoResponse, IUsuarioRequest } from '@entrypoint';

export class BuscarCarrinhoController {
  public constructor(private usecase: BuscarCarrinhoUseCase) {}

  public async handle(queryParams: IUsuarioRequest): Promise<ICarrinhoResponse> {
    const idUsuario: string = queryParams.idUsuario;
    const carrinho: CarrinhoEntity = await this.usecase.execute(idUsuario);
    return {
      idUsuario: carrinho.idUsuario,
      compras: carrinho.compras ? this.construirCompras(carrinho.compras) : [],
    };
  }

  private construirCompras(compras: CompraEntity[]): any {
    return compras.map((item: CompraEntity) => ({
      idParceiro: item.idParceiro,
      nomeParceiro: item.nomeParceiro,
      idProduto: item.idProduto,
      nomeProduto: item.nomeProduto,
      descricaoProduto: item.descricaoProduto,
      imagemProduto: item.imagemProduto,
      precoProduto: item.precoProduto,
    }));
  }
}
