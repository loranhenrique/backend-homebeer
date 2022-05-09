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
    const comprasAgrupadas = [];

    compras.forEach((compra: CompraEntity) => {
      let soma = 0;
      compras.forEach((compra2: CompraEntity) => {
        if (compra.idProduto === compra2.idProduto) {
          soma++;
        }
      });

      comprasAgrupadas.push({
        idParceiro: compra.idParceiro,
        nomeParceiro: compra.nomeParceiro,
        idProduto: compra.idProduto,
        nomeProduto: compra.nomeProduto,
        descricaoProduto: compra.descricaoProduto,
        imagemProduto: compra.imagemProduto,
        precoProduto: compra.precoProduto,
        quantidade: soma,
      });
    });

    return this.removeDuplicados(comprasAgrupadas, 'idProduto');
  }

  private removeDuplicados(list: any[], propriedade: string): any[] {
    const map = Object.create(null);

    list.forEach(item => {
      const id = item[propriedade];

      if (!map[id]) map[id] = item;
    });

    return Object.values(map);
  }
}
