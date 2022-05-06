import { Feedback } from '@prisma/client';
import { prisma } from '../../prisma';
import {
  FeedbackRepositoryDTO,
  FeedbacksRepository,
} from '../feedbacks-repository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackRepositoryDTO): Promise<Feedback | null> {
    const { type, comment, screenshot } = data;
    const feedback = await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });

    return feedback;
  }
}
