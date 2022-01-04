import { ICarrinho, ParceiroModel, ProdutoModel, UsuarioModel } from '@database';
import { model, Schema } from 'mongoose';

const CarrinhoSchema: Schema = new Schema({
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
});

export default model<ICarrinho>('CarrinhoModel', CarrinhoSchema);
