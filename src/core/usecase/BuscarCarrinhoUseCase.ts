import { CarrinhoEntity, CompraEntity, ICarrinhoBoundary, IUsuarioBoundary, UsuarioEntity } from '@core';

export default class BuscarCarrinhoUseCase {
  public constructor(private iCarrinhoBoundary: ICarrinhoBoundary, private iUsuarioBoundary: IUsuarioBoundary) {}

  public async execute(idUsuario: string): Promise<CarrinhoEntity> {
    const usuario: UsuarioEntity = await this.iUsuarioBoundary.buscarUsuario(null, idUsuario);
    const existeErro = await this.validarUsuario(usuario);
    if (existeErro) throw new Error(existeErro);

    const carrinho: CarrinhoEntity = await this.iCarrinhoBoundary.buscarCarrinho(idUsuario);
    const carritoAtivo: CarrinhoEntity = this.retirarProdutosInativos(carrinho);
    return carritoAtivo;
  }

  private async validarUsuario(usuario: UsuarioEntity): Promise<string> {
    if (!usuario) return 'Usuario não foi encontrado.';
    if (!usuario.ativo) return 'Usuario está inativo.';
    return '';
  }

  private retirarProdutosInativos(carrinho: CarrinhoEntity): CarrinhoEntity {
    let comprasAtivas: CompraEntity[] = [];

    carrinho.compras.forEach((item: CompraEntity) => {
      if (item.ativoProduto && item.ativoParceiro) comprasAtivas.push(item);
    });

    return CarrinhoEntity.buscarCarrinho({ idUsuario: carrinho.idUsuario, compras: comprasAtivas });
  }
}
