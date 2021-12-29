import { BuscarUsuarioUseCase, UsuarioEntity } from '@core';
import { IBuscarUsuarioRequest, IUsuarioResponse } from '@entrypoint';

export class BuscarUsuarioController {
  public constructor(private usecase: BuscarUsuarioUseCase) {}

  public async handle(queryParams: IBuscarUsuarioRequest): Promise<IUsuarioResponse> {
    const request: IBuscarUsuarioRequest = queryParams;
    const usuario: UsuarioEntity = await this.usecase.execute(request.email);

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
