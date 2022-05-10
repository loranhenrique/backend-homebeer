import { DeletarCarrinhoUseCase } from '@core';
import { ICarrinhoRequest } from '@entrypoint';

export class DeletarCarrinhoController {
  public constructor(private usecase: DeletarCarrinhoUseCase) {}

  public async handle(queryParams: ICarrinhoRequest): Promise<void> {
    const carrinho: ICarrinhoRequest = queryParams;
    await this.usecase.execute(carrinho.idUsuario, carrinho.idProduto, carrinho.idParceiro);
  }
}
