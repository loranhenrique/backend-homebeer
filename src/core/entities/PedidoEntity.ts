import { CompraEntity } from '@core';

export default class PedidoEntity {
  public readonly idUsuario: string;
  public compras: CompraEntity[];

  public constructor(props: Partial<PedidoEntity>) {
    Object.assign(this, props);
  }

  public static buscarPedido(props: Partial<PedidoEntity>): PedidoEntity {
    return new PedidoEntity(props);
  }
}
