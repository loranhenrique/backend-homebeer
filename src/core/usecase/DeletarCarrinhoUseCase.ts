import {
  ICarrinhoBoundary,
  IParceiroBoundary,
  IProdutoBoundary,
  IUsuarioBoundary,
  ParceiroEntity,
  ProdutoEntity,
  UsuarioEntity,
} from '@core';

export default class DeletarCarrinhoUseCase {
  public constructor(
    private iCarrinhoBoundary: ICarrinhoBoundary,
    private iUsuarioBoundary: IUsuarioBoundary,
    private iProdutoBoundary: IProdutoBoundary,
    private iParceiroBoundary: IParceiroBoundary,
  ) {}

  public async execute(idUsuario: string, idProduto: string, idParceiro: string): Promise<void> {
    const existeErro: string = await this.validarCompra(idUsuario, idProduto, idParceiro);
    if (existeErro) throw new Error(existeErro);

    await this.iCarrinhoBoundary.deletarCarrinho(idUsuario, idProduto, idParceiro);
  }

  private async validarCompra(idUsuario: string, idProduto: string, idParceiro: string): Promise<string> {
    const erroUsuario: string = await this.validarUsuario(idUsuario);
    if (erroUsuario) return erroUsuario;

    const erroParceiro: string = await this.validarParceiro(idParceiro);
    if (erroParceiro) return erroParceiro;

    const erroProduto: string = await this.validarProduto(idParceiro, idProduto);
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
