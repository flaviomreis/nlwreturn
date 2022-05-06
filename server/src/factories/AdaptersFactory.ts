import NodeMailerMailAdapter from '../adapters/nodemailer-mail-adapter';

export default class AdaptersFactory {
  public static createMailAdapter() {
    const mailAdapter = new NodeMailerMailAdapter();
    return mailAdapter;
  }
}
