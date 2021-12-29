import { CriarUsuarioUseCase } from '@core';
import { ICriarUsuarioRequest } from '@entrypoint';

export class CriarUsuarioController {
  public constructor(private usecase: CriarUsuarioUseCase) {}

  public async handle(queryParams: unknown, body: ICriarUsuarioRequest): Promise<void> {
    const request: ICriarUsuarioRequest = body;
    await this.usecase.execute(request);
  }
}
