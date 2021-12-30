import { IUsuario } from '@database';
import { model, Schema } from 'mongoose';

const UsuarioSchema: Schema = new Schema({
  _id: String,
  nomeCompleto: String,
  email: String,
  senha: String,
  cpf: Number,
  telefone: Number,
  dataNascimento: String,
  ativo: Boolean,
});

export default model<IUsuario>('UsuarioModel', UsuarioSchema);
