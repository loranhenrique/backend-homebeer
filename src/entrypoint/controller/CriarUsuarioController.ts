import { CriarUsuarioUseCase } from '@core';
import { ICriarUsuarioRequestDTO } from '@entrypoint';

export class CriarUsuarioController {
  public constructor(private usecase: CriarUsuarioUseCase) {}

  public async handle(queryParams: unknown, body: ICriarUsuarioRequestDTO): Promise<void> {
    const dto: ICriarUsuarioRequestDTO = body;
    return await this.usecase.execute(dto);
  }
}
