import { UsuarioEntity } from '@core';

export interface IUsuarioBoundary {
  buscarUsuario(email: string, idUsuario?: string): Promise<UsuarioEntity>;
  salvarUsuario(usuario: UsuarioEntity): Promise<void>;
}
