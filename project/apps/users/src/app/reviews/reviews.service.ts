import { BadRequestException, Injectable } from "@nestjs/common";
import { Review } from "@project/shared/app-types";
import { ReviewRepository } from "./reviews.repository";
import { NewReviewDto } from "./dto/new-review.dto";
import { ReviewEntity } from "./reviews.entity";

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async createReview(dto: NewReviewDto): Promise<Review> {
    const reviews = await this.reviewRepository.findByTaskId(dto.taskId)
    if (reviews.length !== 0) {
      throw new BadRequestException('Одно выполненное задание — один отзыв');
    }
    return this.reviewRepository.create(new ReviewEntity(dto))
  }

  async getReview(id: string): Promise<Review> {
    return this.reviewRepository.findById(id);
  }

  async getReviewByUser(userId: string): Promise<Review[]> {
    return this.reviewRepository.findByUserId(userId);
  }
}