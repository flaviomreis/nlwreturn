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
  async sendMail({ subject, body, screenshot }: SendMailDto) {
    if (screenshot) {
      const attachments = [
        {
          filename: 'image.png',
          path: screenshot,
          cid: 'unique@nodemailer.com',
        },
      ];

      await transport.sendMail({
        from: '🤗 Equipe Feedget <oi@feedget.com>',
        to: 'Flávio <flaviomreispgers@gmail.com>',
        subject,
        html:
          body + '<img src="cid:unique@nodemailer.com" alt="embedded image"/>',
        attachments,
      });
    } else {
      await transport.sendMail({
        from: '🤗 Equipe Feedget <oi@feedget.com>',
        to: 'Flávio <flaviomreispgers@gmail.com>',
        subject,
        html: body,
      });
    }
  }
}
