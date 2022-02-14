import { BuscarFavoritoUseCase } from '@core';
import { BuscarFavoritoController } from '@entrypoint';
import { MongoFavoritoRepository, MongoUsuarioRepository } from '@repository';

export const buscarFavoritoModule = (): BuscarFavoritoController => {
  const mongoFavoritoRepository = new MongoFavoritoRepository();
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const buscarFavoritoUseCase = new BuscarFavoritoUseCase(mongoFavoritoRepository, mongoUsuarioRepository);

  return new BuscarFavoritoController(buscarFavoritoUseCase);
};
