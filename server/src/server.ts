import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  response.send({ user1: 'flavio' });
});

app.listen(3333, () => {
  console.log('http server listening on 3333 port.');
});
