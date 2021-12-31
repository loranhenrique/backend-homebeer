import { ParceiroEntity } from '@core';

export interface IParceiroBoundary {
  buscarParceiro(): Promise<ParceiroEntity[]>;
  salvarParceiro(parceiro: ParceiroEntity): Promise<void>;
}
