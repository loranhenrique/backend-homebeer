import { UsuarioEntity } from '@core';

export default interface IUsuarioBoundary {
  procurarUsuario(email: string): Promise<UsuarioEntity>;
  salvarUsuario(usuario: UsuarioEntity): Promise<void>;
}
