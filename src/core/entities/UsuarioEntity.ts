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

    if (!props.id) {
      this.id = uuidv4();
    }

    if (!props.ativo) {
      this.ativo = true;
    }
  }
}
