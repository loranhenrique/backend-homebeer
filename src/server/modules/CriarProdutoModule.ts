import { CriarProdutoUseCase } from '@core';
import { CriarProdutoController } from '@entrypoint';
import { MongoParceiroRepository, MongoProdutoRepository } from '@repository';

export const criarProdutoModule = (): CriarProdutoController => {
  const mongoProdutoRepository = new MongoProdutoRepository();
  const mongoParceiroRepository = new MongoParceiroRepository();
  const criarProdutoUseCase = new CriarProdutoUseCase(mongoProdutoRepository, mongoParceiroRepository);

  return new CriarProdutoController(criarProdutoUseCase);
};
