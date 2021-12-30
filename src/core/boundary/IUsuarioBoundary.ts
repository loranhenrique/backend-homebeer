import { UsuarioEntity } from '@core';

export interface IUsuarioBoundary {
  buscarUsuario(email: string): Promise<UsuarioEntity>;
  salvarUsuario(usuario: UsuarioEntity): Promise<void>;
}
