import { IUsuarioBoundary, UsuarioEntity } from '@core';
import { ICriarUsuarioRequest } from '@entrypoint';
import { IEmailProvider } from '@providers';

export default class CriarUsuarioUseCase {
  public constructor(private iUsuarioBoundary: IUsuarioBoundary, private iEmailProvider: IEmailProvider) {}

  public async execute(request: ICriarUsuarioRequest): Promise<void> {
    const usuario = new UsuarioEntity(request);

    const usuarioExiste: UsuarioEntity = await this.iUsuarioBoundary.buscarUsuario(usuario.email);

    if (usuarioExiste) throw new Error('Usuario já existe.');

    await this.iUsuarioBoundary.salvarUsuario(usuario);
    await this.iEmailProvider.enviarEmail(request.nomeCompleto, request.email);
  }
}
