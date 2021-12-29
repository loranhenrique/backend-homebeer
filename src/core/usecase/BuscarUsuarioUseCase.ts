import { IUsuarioBoundary, UsuarioEntity } from '@core';

export default class BuscarUsuarioUseCase {
  public constructor(private iUsuarioBoundary: IUsuarioBoundary) {}

  public async execute(email: string): Promise<UsuarioEntity> {
    const usuarioEncontrado: UsuarioEntity = await this.iUsuarioBoundary.buscarUsuario(email);
    if (!usuarioEncontrado) throw new Error('Usuario não foi encontrado.');
    if (!usuarioEncontrado.ativo) throw new Error('Usuario está inativo.');

    return usuarioEncontrado;
  }
}
