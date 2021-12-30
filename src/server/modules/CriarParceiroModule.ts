import { CriarParceiroUseCase } from '@core';
import { CriarParceiroController } from '@entrypoint';
import { MailtrapProvider } from '@providers';
import { MongoParceiroRepository } from '@repository';

export const criarParceiroModule = (): CriarParceiroController => {
  const mongoParceiroRepository = new MongoParceiroRepository();
  const mailtrapProvider = new MailtrapProvider();

  const criarParceiroUseCase = new CriarParceiroUseCase(mongoParceiroRepository, mailtrapProvider);

  return new CriarParceiroController(criarParceiroUseCase);
};
