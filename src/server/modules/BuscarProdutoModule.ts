import { BuscarProdutoUseCase } from '@core';
import { BuscarProdutoController } from '@entrypoint';
import { MongoParceiroRepository, MongoProdutoRepository } from '@repository';

export const buscarProdutoModule = (): BuscarProdutoController => {
  const mongoProdutoRepository = new MongoProdutoRepository();
  const mongoParceiroRepository = new MongoParceiroRepository();
  const buscarProdutoUseCase = new BuscarProdutoUseCase(mongoProdutoRepository, mongoParceiroRepository);

  return new BuscarProdutoController(buscarProdutoUseCase);
};
