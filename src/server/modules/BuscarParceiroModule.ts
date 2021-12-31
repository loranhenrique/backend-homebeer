import { BuscarParceiroUseCase } from '@core';
import { BuscarParceiroController } from '@entrypoint';
import { MongoParceiroRepository } from '@repository';

export const buscarParceiroModule = (): BuscarParceiroController => {
  const mongoParceiroRepository = new MongoParceiroRepository();
  const buscarParceiroUseCase = new BuscarParceiroUseCase(mongoParceiroRepository);

  return new BuscarParceiroController(buscarParceiroUseCase);
};
