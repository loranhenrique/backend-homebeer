import { IParceiroBoundary, ParceiroEntity } from '@core';

export default class BuscarParceiroUseCase {
  public constructor(private iParceiroBoundary: IParceiroBoundary) {}

  public async execute(idParceiroRequest?: string): Promise<ParceiroEntity[]> {
    const parceiros: ParceiroEntity[] = await this.iParceiroBoundary.buscarParceiro();
    const parceirosAtivos: ParceiroEntity[] = this.retirarParceirosInativos(parceiros);

    if (idParceiroRequest) {
      const parceiroEncontrado: ParceiroEntity[] = this.buscarParceiroEspecifico(parceirosAtivos, idParceiroRequest);
      return parceiroEncontrado;
    }

    return parceirosAtivos;
  }

  private retirarParceirosInativos(parceiros: ParceiroEntity[]): ParceiroEntity[] {
    let parceirosAtivos: ParceiroEntity[] = [];

    parceiros.forEach((parceiro: ParceiroEntity) => {
      if (parceiro.ativo) parceirosAtivos.push(parceiro);
    });

    return parceirosAtivos;
  }

  private buscarParceiroEspecifico(parceiros: ParceiroEntity[], idParceiroRequest: string): ParceiroEntity[] {
    const parceiroEncontrado: ParceiroEntity = parceiros.find(
      (parceiro: ParceiroEntity) => parceiro.id === idParceiroRequest,
    );

    const existeErro: string = this.existeErro(parceiroEncontrado);
    if (existeErro) throw new Error(existeErro);

    return [parceiroEncontrado];
  }

  private existeErro(parceiroEncontrado: ParceiroEntity): string {
    if (!parceiroEncontrado) return 'Parceiro não foi encontrado.';
    if (!parceiroEncontrado.ativo) return 'Parceiro está inativo';
    return '';
  }
}
