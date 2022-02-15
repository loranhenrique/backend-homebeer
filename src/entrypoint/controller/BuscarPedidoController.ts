import { BuscarPedidoUseCase, PedidoOutput } from '@core';
import { IPedidoResponse, IUsuarioRequest } from '@entrypoint';

export class BuscarPedidoController {
  public constructor(private usecase: BuscarPedidoUseCase) {}

  public async handle(queryParams: IUsuarioRequest): Promise<IPedidoResponse[]> {
    const idUsuario: string = queryParams.idUsuario;
    const pedidos: PedidoOutput[] = await this.usecase.execute(idUsuario);
    return this.construirPedido(pedidos);
  }

  private construirPedido(pedidos: PedidoOutput[]): IPedidoResponse[] {
    return pedidos.map((pedido: PedidoOutput) => ({
      numeroPedido: pedido.numeroPedido,
      itensPedido: pedido.itensPedido,
    }));
  }
}
