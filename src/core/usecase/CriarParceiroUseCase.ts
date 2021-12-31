import { IParceiroBoundary, ParceiroEntity } from '@core';
import { ICriarParceiroRequest } from '@entrypoint';
import { IEmailProvider } from '@providers';

export default class CriarParceiroUseCase {
  public constructor(private iParceiroBoundary: IParceiroBoundary, private iEmailProvider: IEmailProvider) {}

  public async execute(request: ICriarParceiroRequest): Promise<void> {
    const parceiroRequest = ParceiroEntity.criarParceiro(request);
    const parceiros: ParceiroEntity[] = await this.iParceiroBoundary.buscarParceiro();
    const parceiroExiste: ParceiroEntity = this.validarParceiro(parceiros, parceiroRequest);
    if (parceiroExiste) throw new Error('Parceiro já existe.');

    await this.iParceiroBoundary.salvarParceiro(parceiroRequest);
    await this.iEmailProvider.enviarEmail(parceiroRequest.nomeCompletoDono, parceiroRequest.email);
  }

  private validarParceiro(parceiros: ParceiroEntity[], parceiroRequest: ParceiroEntity): ParceiroEntity {
    return parceiros.find((parceiro: ParceiroEntity) => parceiro.cnpj === parceiroRequest.cnpj);
  }
}
