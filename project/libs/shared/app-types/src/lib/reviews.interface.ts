import { Types } from "mongoose";

export interface Review {
  reviewId?: number;
  createdAt?: Date;
  taskId?: number;
  message: string;
  userId: Types.ObjectId;
  rating: number;
}
