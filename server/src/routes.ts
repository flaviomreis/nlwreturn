import express from 'express';
import AdaptersFactory from './factories/AdaptersFactory';
import RepositoriesFactory from './factories/RepositoriesFactory';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const router = express.Router();

router.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;
  const feedbackRepository = RepositoriesFactory.createFeedbackRepository();
  const mailAdapter = AdaptersFactory.createMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    feedbackRepository,
    mailAdapter
  );
  const feedback = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return response.status(201).send(feedback);
});
