import { Review } from "@project/shared/app-types";
import { Types } from "mongoose";

export class ReviewEntity implements Review {
  public reviewId: number;
  public taskId: number;
  public message: string;
  public userId: Types.ObjectId;
  public rating: number;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public toObject() {
    return {
      reviewId: this.reviewId,
      taskId: this.taskId,
      message: this.message,
      userId: this.userId,
      rating: this.rating,
    };
  }

  public fillEntity(review: Review) {
    this.reviewId = review.reviewId;
    this.taskId = review.taskId;
    this.message = review.message;
    this.userId = review.userId;
    this.rating = review.rating;
  }

}
