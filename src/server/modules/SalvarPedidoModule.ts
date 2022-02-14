import { SalvarPedidoUseCase } from '@core';
import { SalvarPedidoController } from '@entrypoint';
import {
  MongoPedidoRepository,
  MongoParceiroRepository,
  MongoProdutoRepository,
  MongoUsuarioRepository,
} from '@repository';

export const salvarPedidoModule = (): SalvarPedidoController => {
  const mongoPedidoRepository = new MongoPedidoRepository();
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const mongoProdutoRepository = new MongoProdutoRepository();
  const mongoParceiroRepository = new MongoParceiroRepository();
  const salvarPedidoUseCase = new SalvarPedidoUseCase(
    mongoPedidoRepository,
    mongoUsuarioRepository,
    mongoParceiroRepository,
    mongoProdutoRepository,
  );

  return new SalvarPedidoController(salvarPedidoUseCase);
};
