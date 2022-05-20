import { BuscarFavoritoUseCase, BuscarParceiroUseCase } from '@core';
import { BuscarParceiroController } from '@entrypoint';
import { MongoFavoritoRepository, MongoParceiroRepository, MongoUsuarioRepository } from '@repository';

export const buscarParceiroModule = (): BuscarParceiroController => {
  const mongoParceiroRepository = new MongoParceiroRepository();
  const mongoFavoritoRepository = new MongoFavoritoRepository();
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const buscarParceiroUseCase = new BuscarParceiroUseCase(mongoParceiroRepository);
  const buscarFavoritoUseCase = new BuscarFavoritoUseCase(mongoFavoritoRepository, mongoUsuarioRepository);

  return new BuscarParceiroController(buscarParceiroUseCase, buscarFavoritoUseCase);
};
