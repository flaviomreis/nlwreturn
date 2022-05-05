import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'aaa',
    pass: 'bbb',
  },
});

app.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Flávio <flavio@f18s.f9s>',
    subject: 'Novo feedback',
    html: ['fsadfasd'],
  });

  return response.status(201).send(feedback);
});

app.listen(3333, () => {
  console.log('http server listening on 3333 port.');
});
