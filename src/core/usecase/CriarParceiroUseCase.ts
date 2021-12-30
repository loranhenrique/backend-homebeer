import { IParceiroBoundary, ParceiroEntity } from '@core';
import { ICriarParceiroRequest } from '@entrypoint';
import { IEmailProvider } from '@providers';

export default class CriarParceiroUseCase {
  public constructor(private iParceiroBoundary: IParceiroBoundary, private iEmailProvider: IEmailProvider) {}

  public async execute(request: ICriarParceiroRequest): Promise<void> {
    const parceiro = ParceiroEntity.criarParceiro(request);
    const parceiroExiste: ParceiroEntity = await this.iParceiroBoundary.buscarParceiro(parceiro.cnpj);
    if (parceiroExiste) throw new Error('Parceiro já existe.');

    await this.iParceiroBoundary.salvarParceiro(parceiro);
    await this.iEmailProvider.enviarEmail(parceiro.nomeCompletoDono, parceiro.email);
  }
}
