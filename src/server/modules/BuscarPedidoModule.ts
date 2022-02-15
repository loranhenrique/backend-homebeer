import { BuscarPedidoUseCase } from '@core';
import { BuscarPedidoController } from '@entrypoint';
import { MongoPedidoRepository, MongoUsuarioRepository } from '@repository';

export const buscarPedidoModule = (): BuscarPedidoController => {
  const mongoPedidoRepository = new MongoPedidoRepository();
  const mongoUsuarioRepository = new MongoUsuarioRepository();
  const buscarPedidoUseCase = new BuscarPedidoUseCase(mongoPedidoRepository, mongoUsuarioRepository);

  return new BuscarPedidoController(buscarPedidoUseCase);
};
