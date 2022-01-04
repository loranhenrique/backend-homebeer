import { CompraEntity } from '@core';

export default class CarrinhoEntity {
  public readonly idUsuario: string;
  public compras: CompraEntity[];

  public constructor(props: Partial<CarrinhoEntity>) {
    Object.assign(this, props);
  }

  public static buscarCarrinho(props: Partial<CarrinhoEntity>): CarrinhoEntity {
    return new CarrinhoEntity(props);
  }
}
