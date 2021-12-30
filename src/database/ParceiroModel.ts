import { IParceiro } from '@database';
import { model, Schema } from 'mongoose';

const ParceiroSchema: Schema = new Schema({
  _id: String,
  nomeCompletoDono: String,
  email: String,
  senha: String,
  celularDono: Number,
  ativo: Boolean,
  imagemLoja: String,
  nomeLoja: String,
  descricaoLoja: String,
  cnpj: Number,
});

export default model<IParceiro>('ParceiroModel', ParceiroSchema);
