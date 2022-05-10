import { DeletarCarrinhoUseCase } from '@core';
import { DeletarCarrinhoController } from '@entrypoint';
import {
  MongoCarrinhoRepository,
  MongoParceiroRepository,
  MongoProdutoRepository,
  MongoUsuarioRepository,
} from '@repository';

export const deletarCarrinhoModule = (): DeletarCarrinhoController => {
  const mongoCarrinhoRepository = new MongoCarrinhoRepository();
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const mongoProdutoRepository = new MongoProdutoRepository();
  const mongoParceiroRepository = new MongoParceiroRepository();
  const deletarCarrinhoUseCase = new DeletarCarrinhoUseCase(
    mongoCarrinhoRepository,
    mongoUsuarioRepository,
    mongoProdutoRepository,
    mongoParceiroRepository,
  );

  return new DeletarCarrinhoController(deletarCarrinhoUseCase);
};
