import { IUsuarioBoundary, UsuarioEntity } from '@core';
import { UsuarioModel } from '@database';

export class MongoUsuarioRepository implements IUsuarioBoundary {
  public async buscarUsuario(email: string): Promise<UsuarioEntity> {
    const usuario = await UsuarioModel.findOne({ email });

    if (!usuario) return null;

    return {
      id: usuario._id,
      ativo: usuario.ativo,
      nomeCompleto: usuario.nomeCompleto,
      email: usuario.email,
      cpf: usuario.cpf,
      senha: usuario.senha,
      dataNascimento: usuario.dataNascimento,
      telefone: usuario.telefone,
    };
  }

  public async salvarUsuario(usuario: UsuarioEntity): Promise<void> {
    await UsuarioModel.create({ ...usuario, _id: usuario.id });
  }
}
