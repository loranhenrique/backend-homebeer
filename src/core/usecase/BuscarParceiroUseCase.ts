import { IParceiroBoundary, ParceiroEntity } from '@core';

export default class BuscarParceiroUseCase {
  public constructor(private iParceiroBoundary: IParceiroBoundary) {}

  public async execute(): Promise<ParceiroEntity[]> {
    const parceiros: ParceiroEntity[] = await this.iParceiroBoundary.buscarParceiro();
    if (!parceiros) return [];
    const parceirosAtivos: ParceiroEntity[] = this.retirarParceirosInativos(parceiros);
    return parceirosAtivos;
  }

  private retirarParceirosInativos(parceiros: ParceiroEntity[]): ParceiroEntity[] {
    let parceirosAtivos: ParceiroEntity[] = [];

    parceiros.forEach((parceiro: ParceiroEntity) => {
      if (parceiro.ativo) parceirosAtivos.push(parceiro);
    });

    return parceirosAtivos;
  }
}
