export interface IEmailProvider {
  enviarEmail(nome: string, email: string): Promise<void>;
}
