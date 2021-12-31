import { IProdutoBoundary, ProdutoEntity } from '@core';
import { IProduto, ProdutoModel } from '@database';

export class MongoProdutoRepository implements IProdutoBoundary {
  public async buscarProduto(idParceiro: string): Promise<ProdutoEntity[]> {
    const produtos: IProduto[] = await ProdutoModel.find({ _idParceiro: idParceiro });

    if (!produtos) return [];

    return produtos.map((produto: IProduto) => ({
      idParceiro: produto._idParceiro,
      id: produto._id,
      ativo: produto.ativo,
      imagem: produto.imagem,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
    }));
  }

  public async salvarProduto(produto: ProdutoEntity): Promise<void> {
    await ProdutoModel.create({ ...produto, _id: produto.id, _idParceiro: produto.idParceiro });
  }
}
