export interface Comment {
  commentId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  taskId: number;
  message: string;
  userId: string;
}
