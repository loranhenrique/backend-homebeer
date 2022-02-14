import { CarrinhoEntity, CompraEntity, ICarrinhoBoundary } from '@core';
import { CarrinhoModel, ICarrinho } from '@database';

export class MongoCarrinhoRepository implements ICarrinhoBoundary {
  public async deletarCarrinho(idUsuario: string, idProduto: string, idParceiro: string): Promise<void> {
    await CarrinhoModel.findOneAndDelete({
      usuario: idUsuario,
      produto: idProduto,
      parceiro: idParceiro,
    });
  }

  public async buscarCarrinho(idUsuario: string): Promise<CarrinhoEntity> {
    const carrinho: ICarrinho[] = await CarrinhoModel.find({ usuario: idUsuario })
      .populate('usuario')
      .populate('produto')
      .populate('parceiro');

    if (carrinho.length < 1) return { idUsuario, compras: [] };

    return {
      idUsuario: idUsuario,
      compras: this.criarCompras(carrinho),
    };
  }

  public async salvarCarrinho(idUsuario: string, idProduto: string, idParceiro: string): Promise<void> {
    await CarrinhoModel.create({ usuario: idUsuario, produto: idProduto, parceiro: idParceiro });
  }

  private criarCompras(carrinho: ICarrinho[]): CompraEntity[] {
    return carrinho.map((item: ICarrinho) => ({
      idParceiro: item.parceiro._id,
      ativoParceiro: item.parceiro.ativo,
      nomeParceiro: item.parceiro.nomeLoja,
      idProduto: item.produto._id,
      ativoProduto: item.produto.ativo,
      nomeProduto: item.produto.nome,
      descricaoProduto: item.produto.descricao,
      imagemProduto: item.produto.imagem,
      precoProduto: item.produto.preco,
    }));
  }
}
