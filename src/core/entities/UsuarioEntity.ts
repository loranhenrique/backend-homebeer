import { v4 as uuidv4 } from 'uuid';

export default class UsuarioEntity {
  public readonly id: string;
  public readonly ativo: boolean;
  public nomeCompleto: string;
  public email: string;
  public senha: string;
  public cpf: number;
  public telefone: number;
  public dataNascimento: string;

  public constructor(props: Partial<UsuarioEntity>) {
    Object.assign(this, props);
  }

  public static criarUsuario({
    nomeCompleto,
    email,
    senha,
    cpf,
    telefone,
    dataNascimento,
  }: Partial<UsuarioEntity>): UsuarioEntity {
    return new UsuarioEntity({
      nomeCompleto,
      email,
      senha,
      cpf,
      telefone,
      dataNascimento,
      ativo: true,
      id: uuidv4(),
    });
  }
}
