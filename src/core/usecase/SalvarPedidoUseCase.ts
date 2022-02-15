import {
  IParceiroBoundary,
  IPedidoBoundary,
  IProdutoBoundary,
  IUsuarioBoundary,
  ParceiroEntity,
  ProdutoEntity,
  UsuarioEntity,
} from '@core';
import { v4 as uuidv4 } from 'uuid';
import { IPedidoRequest } from '@entrypoint';

export default class SalvarPedidoUseCase {
  public constructor(
    private iPedidoBoundary: IPedidoBoundary,
    private iUsuarioBoundary: IUsuarioBoundary,
    private iParceiroBoundary: IParceiroBoundary,
    private iProdutoBoundary: IProdutoBoundary,
  ) {}

  public async execute(iPedidosRequest: IPedidoRequest[]): Promise<void> {
    const existeErro: string = await this.validarCompra(iPedidosRequest);
    if (existeErro) throw new Error(existeErro);

    const idPedido = uuidv4();

    for (const pedido of iPedidosRequest) {
      await this.iPedidoBoundary.salvarPedido(pedido.idUsuario, pedido.idProduto, pedido.idParceiro, idPedido);
    }
  }

  private async validarCompra(iPedidoRequest: IPedidoRequest[]): Promise<string> {
    let erroUsuario = '';
    let erroParceiro = '';
    let erroProduto = '';

    for (const pedido of iPedidoRequest) {
      const usuario: UsuarioEntity = await this.iUsuarioBoundary.buscarUsuario(null, pedido.idUsuario);

      if (!usuario) {
        erroUsuario = 'Usuario não encontrado.';
        continue;
      }

      if (!usuario.ativo) {
        erroUsuario = 'Usuario está inativo.';
        continue;
      }
    }

    if (erroUsuario) return erroUsuario;

    for (const pedido of iPedidoRequest) {
      const parceiros: ParceiroEntity[] = await this.iParceiroBoundary.buscarParceiro();
      const parceiroEncontrado: ParceiroEntity = parceiros.find(
        (parceiro: ParceiroEntity) => parceiro.id === pedido.idParceiro,
      );

      if (!parceiroEncontrado) {
        erroParceiro = 'Parceiro não foi encontrado.';
        continue;
      }

      if (!parceiroEncontrado.ativo) {
        erroParceiro = 'Parceiro está inativo.';
        continue;
      }
    }

    if (erroParceiro) return erroParceiro;

    for (const pedido of iPedidoRequest) {
      const produtos: ProdutoEntity[] = await this.iProdutoBoundary.buscarProduto(pedido.idParceiro);
      const produtoEncontrado: ProdutoEntity = produtos.find(
        (produto: ProdutoEntity) => produto.id === pedido.idProduto,
      );

      if (!produtoEncontrado) {
        erroProduto = 'Produto não encontrado.';
        continue;
      }

      if (!produtoEncontrado.ativo) {
        erroProduto = 'Produto está inativo.';
        continue;
      }
    }

    if (erroProduto) return erroProduto;

    return '';
  }
}
