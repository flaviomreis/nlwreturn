import { FeedbacksRepository } from '../repositories/feedbacks-repository';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';

export default class RepositoriesFactory {
  public static createFeedbackRepository(): FeedbacksRepository {
    const feedbackRepository = new PrismaFeedbacksRepository();
    return feedbackRepository;
  }
}
