export interface SendMailDto {
  subject: string;
  body: string;
  screenshot?: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailDto) => Promise<void>;
}
