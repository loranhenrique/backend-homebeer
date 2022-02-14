import { IFavoritoBoundary, IParceiroBoundary, IUsuarioBoundary, ParceiroEntity, UsuarioEntity } from '@core';

export default class SalvarFavoritoUseCase {
  public constructor(
    private iFavoritoBoundary: IFavoritoBoundary,
    private iUsuarioBoundary: IUsuarioBoundary,
    private iParceiroBoundary: IParceiroBoundary,
  ) {}

  public async execute(idUsuario: string, idParceiro: string): Promise<void> {
    const existeErro: string = await this.validarFavorito(idUsuario, idParceiro);
    if (existeErro) throw new Error(existeErro);

    await this.iFavoritoBoundary.salvarFavorito(idUsuario, idParceiro);
  }

  private async validarFavorito(idUsuario: string, idParceiro: string): Promise<string> {
    const erroUsuario: string = await this.validarUsuario(idUsuario);
    if (erroUsuario) return erroUsuario;

    const erroParceiro: string = await this.validarParceiro(idParceiro);
    if (erroParceiro) return erroParceiro;

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
}
