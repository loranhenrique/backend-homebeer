import { CriarParceiroUseCase } from '@core';
import { ICriarParceiroRequest } from '@entrypoint';

export class CriarParceiroController {
  public constructor(private usecase: CriarParceiroUseCase) {}

  public async handle(queryParams: unknown, body: ICriarParceiroRequest): Promise<void> {
    const request: ICriarParceiroRequest = body;
    await this.usecase.execute(request);
  }
}
