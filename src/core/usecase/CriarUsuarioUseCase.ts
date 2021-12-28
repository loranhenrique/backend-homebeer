import { IUsuarioBoundary, UsuarioEntity } from '@core';
import { ICriarUsuarioRequestDTO } from '@entrypoint';
import { IEmailProvider } from '@providers';

export default class CriarUsuarioUseCase {
  public constructor(private iUsuarioBoundary: IUsuarioBoundary, private iEmailProvider: IEmailProvider) {}

  public async execute(dto: ICriarUsuarioRequestDTO): Promise<void> {
    const usuario = new UsuarioEntity(dto);

    const usuarioExiste: UsuarioEntity = await this.iUsuarioBoundary.procurarUsuario(usuario.email);

    if (usuarioExiste) {
      throw new Error('Usuario já existe.');
    }

    await this.iUsuarioBoundary.salvarUsuario(usuario);
    await this.iEmailProvider.enviarEmail(dto.nomeCompleto, dto.email);
  }
}
