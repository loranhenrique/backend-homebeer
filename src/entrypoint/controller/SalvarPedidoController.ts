import { SalvarPedidoUseCase } from '@core';
import { IPedidoRequest } from '@entrypoint';

export class SalvarPedidoController {
  public constructor(private usecase: SalvarPedidoUseCase) {}

  public async handle(queryParams: unknown, body: any): Promise<void> {
    const pedidos: IPedidoRequest[] = body;
    await this.usecase.execute(pedidos);
  }
}
