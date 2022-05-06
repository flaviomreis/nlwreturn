import nodemailer from 'nodemailer';
import { MailAdapter, SendMailDto } from './mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '91284a3cdf4794',
    pass: '2b6b462da35f9a',
  },
});

export default class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailDto) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Flávio <flaviomreispgers@gmail.com>',
      subject,
      html: body,
    });
  }
}
