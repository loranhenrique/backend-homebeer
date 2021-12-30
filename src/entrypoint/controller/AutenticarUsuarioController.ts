import { AutenticarUsuarioUseCase, UsuarioEntity } from '@core';
import { IAutenticarUsuarioRequest, IUsuarioResponse } from '@entrypoint';

export class AutenticarUsuarioController {
  public constructor(private usecase: AutenticarUsuarioUseCase) {}

  public async handle(queryParams: unknown, body: IAutenticarUsuarioRequest): Promise<IUsuarioResponse> {
    const request: IAutenticarUsuarioRequest = body;
    const usuario: UsuarioEntity = await this.usecase.execute(request.email, request.senha);

    return {
      id: usuario.id,
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      cpf: usuario.cpf,
      telefone: usuario.telefone,
      dataNascimento: usuario.dataNascimento,
    } as IUsuarioResponse;
  }
}
