import { IUsuarioBoundary, UsuarioEntity } from '@core';
import { ICriarUsuarioRequest } from '@entrypoint';
import { IEmailProvider } from '@providers';

export default class CriarUsuarioUseCase {
  public constructor(private iUsuarioBoundary: IUsuarioBoundary, private iEmailProvider: IEmailProvider) {}

  public async execute(request: ICriarUsuarioRequest): Promise<void> {
    const usuarioExiste: UsuarioEntity = await this.iUsuarioBoundary.buscarUsuario(request.email);
    if (usuarioExiste) throw new Error('Usuario já existe.');

    const usuarioEntity = UsuarioEntity.criarUsuario(request);
    await this.iUsuarioBoundary.salvarUsuario(usuarioEntity);
    await this.iEmailProvider.enviarEmail(usuarioEntity.nomeCompleto, usuarioEntity.email);
  }
}
