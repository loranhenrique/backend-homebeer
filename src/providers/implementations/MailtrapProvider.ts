import { IEmailProvider } from '@providers';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class MailtrapProvider implements IEmailProvider {
  private transporter: Mail;

  public constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '75bc3532d3c6ed',
        pass: '7fc77997a6b1d6',
      },
    });
  }

  public async enviarEmail(nome: string, email: string): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: nome,
        address: email,
      },
      from: {
        name: 'Equipe Homebeer',
        address: 'equipe@homebeer.com',
      },
      subject: 'Seja bem-vindo à plataforma!',
      html: '<p>Você já pode fazer login em nossa plataforma.</p>',
    });
  }
}
