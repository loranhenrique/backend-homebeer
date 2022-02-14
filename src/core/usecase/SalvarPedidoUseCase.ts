import {
  IParceiroBoundary,
  IPedidoBoundary,
  IProdutoBoundary,
  IUsuarioBoundary,
  ParceiroEntity,
  ProdutoEntity,
  UsuarioEntity,
} from '@core';
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

    iPedidosRequest.forEach(async (iPedidoRequest: IPedidoRequest) => {
      await this.iPedidoBoundary.salvarPedido(
        iPedidoRequest.idUsuario,
        iPedidoRequest.idProduto,
        iPedidoRequest.idParceiro,
      );
    });
  }

  private async validarCompra(iPedidoRequest: IPedidoRequest[]): Promise<string> {
    let erroUsuario = '';
    let erroParceiro = '';
    let erroProduto = '';

    iPedidoRequest.forEach(async (pedidoRequest: IPedidoRequest) => {
      [erroUsuario, erroParceiro, erroProduto] = await Promise.all([
        this.validarUsuario(pedidoRequest.idUsuario),
        this.validarParceiro(pedidoRequest.idParceiro),
        this.validarProduto(pedidoRequest.idParceiro, pedidoRequest.idProduto),
      ]);
    });

    if (erroUsuario) return erroUsuario;
    if (erroParceiro) return erroParceiro;
    if (erroProduto) return erroProduto;

    return '';
  }

  private async validarUsuario(idUsuario: string): Promise<string> {
    const usuario: UsuarioEntity = await this.iUsuarioBoundary.buscarUsuario(null, idUsuario);
    if (!usuario) return 'Usuario não encontrado.';
    if (!usuario.ativo) return 'Usuario está inativo.';
    return '';
  }

  private async validarParceiro(idParceiro: string): Promise<string> {
    const parceiros: ParceiroEntity[] = await this.iParceiroBoundary.buscarParceiro();
    const parceiroEncontrado: ParceiroEntity = parceiros.find((parceiro: ParceiroEntity) => parceiro.id === idParceiro);
    if (!parceiroEncontrado) return 'Parceiro não foi encontrado.';
    if (!parceiroEncontrado.ativo) return 'Parceiro está inativo.';
    return '';
  }

  private async validarProduto(idParceiro: string, idProduto: string): Promise<string> {
    const produtos: ProdutoEntity[] = await this.iProdutoBoundary.buscarProduto(idParceiro);
    const produtoEncontrado: ProdutoEntity = produtos.find((produto: ProdutoEntity) => produto.id === idProduto);
    if (!produtoEncontrado) return 'Produto não encontrado.';
    if (!produtoEncontrado.ativo) return 'Produto está inativo.';
    return '';
  }
}
