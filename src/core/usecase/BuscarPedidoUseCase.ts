import { IPedidoBoundary, IUsuarioBoundary, PedidoEntity, PedidoOutput, UsuarioEntity } from '@core';
import { ItemOutput, ProdutoOutput } from '../output';

export default class BuscarPedidoUseCase {
  public constructor(private iPedidoBoundary: IPedidoBoundary, private iUsuarioBoundary: IUsuarioBoundary) {}

  public async execute(idUsuario: string): Promise<PedidoOutput[]> {
    const usuario: UsuarioEntity = await this.iUsuarioBoundary.buscarUsuario(null, idUsuario);
    const existeErro = await this.validarUsuario(usuario);
    if (existeErro) throw new Error(existeErro);

    const pedidos: PedidoEntity[] = await this.iPedidoBoundary.buscarPedido(idUsuario);
    const pedidosAgrupados = this.agruparPedido(pedidos);

    return pedidosAgrupados;
  }

  private async validarUsuario(usuario: UsuarioEntity): Promise<string> {
    if (!usuario) return 'Usuario não foi encontrado.';
    if (!usuario.ativo) return 'Usuario está inativo.';
    return '';
  }

  private agruparPedido(pedidos: PedidoEntity[]): PedidoOutput[] {
    const pedidosAgrupados: PedidoOutput[] = [];
    let contator = 1;
    let identificadorAtual = '';

    pedidos.forEach((pedidoAtual: PedidoEntity) => {
      const item: PedidoEntity[] = [];

      pedidos.forEach((pedido: PedidoEntity) => {
        if (identificadorAtual === pedido.identificadorPedido) return;

        if (pedidoAtual.identificadorPedido === pedido.identificadorPedido) {
          item.push(pedido);
        }
      });

      if (item.length > 0) {
        pedidosAgrupados.push({
          numeroPedido: contator,
          itensPedido: this.mapearItensPedido(item),
        });

        identificadorAtual = pedidoAtual.identificadorPedido;
        contator++;
      }
    });

    return pedidosAgrupados;
  }

  private mapearItensPedido(pedidos: PedidoEntity[]): ItemOutput[] {
    const parceiros: ItemOutput[] = [];
    let parceiroAtual = '';

    const pedidosOrdenados: PedidoEntity[] = pedidos.sort((a: PedidoEntity, b: PedidoEntity) =>
      a.idParceiro < b.idParceiro ? -1 : a.idParceiro > b.idParceiro ? 1 : 0,
    );

    pedidosOrdenados.forEach((pedido: PedidoEntity) => {
      if (pedido.idParceiro === parceiroAtual) return;

      parceiros.push({
        parceiro: {
          idParceiro: pedido.idParceiro,
          nomeParceiro: pedido.nomeParceiro,
          imagemParceiro: pedido.imagemParceiro,
          produtos: this.mapearProdutosParceiro(pedidosOrdenados, pedido.idParceiro),
          status: pedido.status,
        },
      });

      parceiroAtual = pedido.idParceiro;
    });

    return parceiros;
  }

  private mapearProdutosParceiro(pedidos: PedidoEntity[], idParceiro: string): ProdutoOutput[] {
    const produtos: ProdutoOutput[] = [];

    pedidos.forEach((pedido: PedidoEntity) => {
      if (pedido.idParceiro === idParceiro) {
        produtos.push({
          idProduto: pedido.idProduto,
          nomeProduto: pedido.nomeProduto,
          descricaoProduto: pedido.descricaoProduto,
          imagemProduto: pedido.imagemProduto,
          precoProduto: pedido.precoProduto,
        });
      }
    });

    return produtos;
  }
}
