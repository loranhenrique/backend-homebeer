import { IFavorito, ParceiroModel, UsuarioModel } from '@database';
import { model, Schema } from 'mongoose';

const FavoritoSchema: Schema = new Schema({
  usuario: {
    type: Schema.Types.String,
    ref: UsuarioModel,
  },
  parceiro: {
    type: Schema.Types.String,
    ref: ParceiroModel,
  },
});

export default model<IFavorito>('FavoritoModel', FavoritoSchema);
