import { BuscarCarrinhoUseCase } from '@core';
import { BuscarCarrinhoController } from '@entrypoint';
import { MongoCarrinhoRepository, MongoUsuarioRepository } from '@repository';

export const buscarCarrinhoModule = (): BuscarCarrinhoController => {
  const mongoCarrinhoRepository = new MongoCarrinhoRepository();
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const buscarCarrinhoUseCase = new BuscarCarrinhoUseCase(mongoCarrinhoRepository, mongoUsuarioRepository);

  return new BuscarCarrinhoController(buscarCarrinhoUseCase);
};
