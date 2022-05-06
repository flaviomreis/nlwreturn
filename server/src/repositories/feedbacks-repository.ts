import { Feedback } from '@prisma/client';

export interface FeedbackRepositoryDTO {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackRepositoryDTO) => Promise<Feedback | null> | null;
}
