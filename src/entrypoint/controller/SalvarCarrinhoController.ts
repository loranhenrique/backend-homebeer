import { SalvarCarrinhoUseCase } from '@core';
import { ICarrinhoRequest } from '@entrypoint';

export class SalvarCarrinhoController {
  public constructor(private usecase: SalvarCarrinhoUseCase) {}

  public async handle(queryParams: unknown, body: any): Promise<void> {
    const carrinho: ICarrinhoRequest = body;
    await this.usecase.execute(carrinho.idUsuario, carrinho.idProduto, carrinho.idParceiro);
  }
}
