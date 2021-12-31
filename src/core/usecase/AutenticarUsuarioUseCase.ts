import { IUsuarioBoundary, UsuarioEntity } from '@core';

export default class AutenticarUsuarioUseCase {
  public constructor(private iUsuarioBoundary: IUsuarioBoundary) {}

  public async execute(emailRequest: string, senhaRequest: string): Promise<UsuarioEntity> {
    const usuarioEncontrado: UsuarioEntity = await this.iUsuarioBoundary.buscarUsuario(emailRequest);
    this.validarUsuario(usuarioEncontrado, senhaRequest);
    return usuarioEncontrado;
  }

  private validarUsuario(usuarioEncontrado: UsuarioEntity, senhaRequest: string): void {
    const existeErro = this.existeErro(usuarioEncontrado, senhaRequest);
    if (existeErro) throw new Error(existeErro);
  }

  private existeErro(usuarioEncontrado: UsuarioEntity, senhaRequest: string): string {
    if (!usuarioEncontrado) return 'Usuario não foi encontrado.';
    if (!usuarioEncontrado.ativo) return 'Usuario está inativo.';
    if (usuarioEncontrado.senha !== senhaRequest) return 'Usuario/senha inválidos.';
    return '';
  }
}
