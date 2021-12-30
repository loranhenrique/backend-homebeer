import { ParceiroEntity } from '@core';

export interface IParceiroBoundary {
  buscarParceiro(cnpj: number): Promise<ParceiroEntity>;
  salvarParceiro(parceiro: ParceiroEntity): Promise<void>;
}
