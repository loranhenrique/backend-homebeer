import { IPedido, ParceiroModel, ProdutoModel, UsuarioModel } from '@database';
import { model, Schema } from 'mongoose';

const PedidoSchema: Schema = new Schema({
  usuario: {
    type: Schema.Types.String,
    ref: UsuarioModel,
  },
  produto: {
    type: Schema.Types.String,
    ref: ProdutoModel,
  },
  parceiro: {
    type: Schema.Types.String,
    ref: ParceiroModel,
  },
  status: String,
});

export default model<IPedido>('PedidoModel', PedidoSchema);
