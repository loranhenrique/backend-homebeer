import { StatusCompraConstantes } from '@config';
import { PedidoEntity, IPedidoBoundary } from '@core';
import { PedidoModel, IPedido } from '@database';

export class MongoPedidoRepository implements IPedidoBoundary {
  public async deletarPedido(idUsuario: string, idParceiro: string): Promise<void> {
    await PedidoModel.findOneAndUpdate(
      {
        usuario: idUsuario,
        parceiro: idParceiro,
      },
      {
        status: StatusCompraConstantes.CANCELADO,
      },
    );
  }

  public async buscarPedido(idUsuario: string): Promise<PedidoEntity[]> {
    const pedidos: IPedido[] = await PedidoModel.find({ usuario: idUsuario })
      .populate('usuario')
      .populate('produto')
      .populate('parceiro');

    if (pedidos.length < 1) return [];

    return pedidos.map((item: IPedido) => ({
      identificadorPedido: item.identificadorPedido,
      idParceiro: item.parceiro._id,
      ativoParceiro: item.parceiro.ativo,
      imagemParceiro: item.parceiro.imagemLoja,
      nomeParceiro: item.parceiro.nomeLoja,
      idProduto: item.produto._id,
      ativoProduto: item.produto.ativo,
      nomeProduto: item.produto.nome,
      descricaoProduto: item.produto.descricao,
      imagemProduto: item.produto.imagem,
      precoProduto: item.produto.preco,
      status: item.status,
    }));
  }

  public async salvarPedido(idUsuario: string, idProduto: string, idParceiro: string, idPedido: string): Promise<void> {
    await PedidoModel.create({
      identificadorPedido: idPedido,
      usuario: idUsuario,
      produto: idProduto,
      parceiro: idParceiro,
      status: StatusCompraConstantes.AGUARDANDO_PAGAMENTO,
    });
  }
}
