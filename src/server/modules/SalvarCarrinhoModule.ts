import { SalvarCarrinhoUseCase } from '@core';
import { SalvarCarrinhoController } from '@entrypoint';
import {
  MongoCarrinhoRepository,
  MongoParceiroRepository,
  MongoProdutoRepository,
  MongoUsuarioRepository,
} from '@repository';

export const salvarCarrinhoModule = (): SalvarCarrinhoController => {
  const mongoCarrinhoRepository = new MongoCarrinhoRepository();
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const mongoProdutoRepository = new MongoProdutoRepository();
  const mongoParceiroRepository = new MongoParceiroRepository();
  const salvarCarrinhoUseCase = new SalvarCarrinhoUseCase(
    mongoCarrinhoRepository,
    mongoUsuarioRepository,
    mongoProdutoRepository,
    mongoParceiroRepository,
  );

  return new SalvarCarrinhoController(salvarCarrinhoUseCase);
};
