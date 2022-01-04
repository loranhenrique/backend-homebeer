import { CarrinhoEntity, CompraEntity, ICarrinhoBoundary } from '@core';
import { CarrinhoModel, ICarrinho } from '@database';

export class MongoCarrinhoRepository implements ICarrinhoBoundary {
  public async buscarCarrinho(_idUsuario: string): Promise<CarrinhoEntity> {
    const carrinho: ICarrinho[] = await CarrinhoModel.find({ usuario: _idUsuario })
      .populate('usuario')
      .populate('produto')
      .populate('parceiro');

    return {
      idUsuario: carrinho[0].usuario._id,
      ativoUsuario: carrinho[0].usuario.ativo,
      compras: this.criarCompras(carrinho),
    };
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

  public async salvarCarrinho(_idUsuario: string, _idProduto: string, _idParceiro: string): Promise<void> {
    await CarrinhoModel.create({ usuario: _idUsuario, produto: _idProduto, parceiro: _idParceiro });
  }
}
