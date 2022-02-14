import { SalvarFavoritoUseCase } from '@core';
import { SalvarFavoritoController } from '@entrypoint';
import { MongoFavoritoRepository, MongoParceiroRepository, MongoUsuarioRepository } from '@repository';

export const salvarFavoritoModule = (): SalvarFavoritoController => {
  const mongoFavoritoRepository = new MongoFavoritoRepository();
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const mongoParceiroRepository = new MongoParceiroRepository();
  const salvarFavoritoUseCase = new SalvarFavoritoUseCase(
    mongoFavoritoRepository,
    mongoUsuarioRepository,
    mongoParceiroRepository,
  );

  return new SalvarFavoritoController(salvarFavoritoUseCase);
};
