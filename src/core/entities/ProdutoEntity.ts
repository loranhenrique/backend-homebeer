import { v4 as uuidv4 } from 'uuid';

export default class ProdutoEntity {
  public readonly idParceiro: string;
  public readonly id: string;
  public readonly ativo: boolean;
  public imagem: string;
  public nome: string;
  public descricao: string;
  public preco: number;

  public constructor(props: Partial<ProdutoEntity>) {
    Object.assign(this, props);
  }

  public static criarProduto({ idParceiro, imagem, nome, descricao, preco }: Partial<ProdutoEntity>): ProdutoEntity {
    return new ProdutoEntity({
      idParceiro,
      imagem,
      nome,
      descricao,
      preco,
      ativo: true,
      id: uuidv4(),
    });
  }
}
