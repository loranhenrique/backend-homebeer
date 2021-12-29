import { MongoUsuarioRepository } from '@client';
import { BuscarUsuarioUseCase } from '@core';
import { BuscarUsuarioController } from '@entrypoint';

export const buscarUsuarioModule = (): BuscarUsuarioController => {
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const buscarUsuarioUseCase = new BuscarUsuarioUseCase(mongoUsuarioRepository);

  return new BuscarUsuarioController(buscarUsuarioUseCase);
};
