import { AutenticarUsuarioUseCase } from '@core';
import { AutenticarUsuarioController } from '@entrypoint';
import { MongoUsuarioRepository } from '@repository';

export const autenticarUsuarioModule = (): AutenticarUsuarioController => {
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const autenticarUsuarioUseCase = new AutenticarUsuarioUseCase(mongoUsuarioRepository);

  return new AutenticarUsuarioController(autenticarUsuarioUseCase);
};
