import { IParceiroBoundary, ParceiroEntity } from '@core';
import { ICriarParceiroRequest } from '@entrypoint';
import { IEmailProvider } from '@providers';

export default class CriarParceiroUseCase {
  public constructor(private iParceiroBoundary: IParceiroBoundary, private iEmailProvider: IEmailProvider) {}

  public async execute(request: ICriarParceiroRequest): Promise<void> {
    const parceiros: ParceiroEntity[] = await this.iParceiroBoundary.buscarParceiro();
    const parceiroExiste: ParceiroEntity = this.validarParceiro(parceiros, request.cnpj);
    if (parceiroExiste) throw new Error('Parceiro já existe.');

    const parceiroEntity = ParceiroEntity.criarParceiro(request);
    await this.iParceiroBoundary.salvarParceiro(parceiroEntity);
    await this.iEmailProvider.enviarEmail(parceiroEntity.nomeCompletoDono, parceiroEntity.email);
  }

  private validarParceiro(parceiros: ParceiroEntity[], cnpjParceiroRequest: number): ParceiroEntity {
    return parceiros.find((parceiro: ParceiroEntity) => parceiro.cnpj === cnpjParceiroRequest);
  }
}
