import { UsuarioEntity } from '@core';

export default interface IUsuarioBoundary {
  buscarUsuario(email: string): Promise<UsuarioEntity>;
  salvarUsuario(usuario: UsuarioEntity): Promise<void>;
}
