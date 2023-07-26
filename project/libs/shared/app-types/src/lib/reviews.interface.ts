export interface Review {
  id?: number;
  createdAt: Date;
  taskId?: number;
  message: string;
  userId: string;
  rating: number;
}
