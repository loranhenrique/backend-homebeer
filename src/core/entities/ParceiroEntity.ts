import { v4 as uuidv4 } from 'uuid';

export default class ParceiroEntity {
  public readonly id: string;
  public readonly ativo: boolean;
  public nomeCompletoDono: string;
  public email: string;
  public senha: string;
  public celularDono: number;
  public imagemLoja: string;
  public nomeLoja: string;
  public descricaoLoja: string;
  public cnpj: number;

  public constructor(props: Partial<ParceiroEntity>) {
    Object.assign(this, props);
  }

  public static criarParceiro({
    nomeCompletoDono,
    email,
    senha,
    celularDono,
    imagemLoja,
    nomeLoja,
    descricaoLoja,
    cnpj,
  }: Partial<ParceiroEntity>): ParceiroEntity {
    return new ParceiroEntity({
      nomeCompletoDono,
      email,
      senha,
      celularDono,
      imagemLoja,
      nomeLoja,
      descricaoLoja,
      cnpj,
      ativo: false,
      id: uuidv4(),
    });
  }
}
