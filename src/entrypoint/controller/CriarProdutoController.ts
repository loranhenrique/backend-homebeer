import { CriarProdutoUseCase } from '@core';
import { ICriarProdutoRequest } from '@entrypoint';

export class CriarProdutoController {
  public constructor(private usecase: CriarProdutoUseCase) {}

  public async handle(queryParams: unknown, body: ICriarProdutoRequest): Promise<void> {
    const request: ICriarProdutoRequest = body;
    await this.usecase.execute(request);
  }
}
