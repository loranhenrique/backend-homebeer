export interface IUsuario {
  _id: string;
  nomeCompleto: string;
  email: string;
  senha: string;
  cpf: number;
  telefone: number;
  dataNascimento: string;
  ativo: boolean;
}
