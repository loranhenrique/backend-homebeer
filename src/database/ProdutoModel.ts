import { IProduto, ParceiroModel } from '@database';
import { model, Schema } from 'mongoose';

const ProdutoSchema: Schema = new Schema({
  _idParceiro: {
    type: Schema.Types.String,
    ref: ParceiroModel,
  },
  _id: String,
  imagem: String,
  nome: String,
  descricao: String,
  preco: Number,
  ativo: Boolean,
});

export default model<IProduto>('ProdutoModel', ProdutoSchema);
