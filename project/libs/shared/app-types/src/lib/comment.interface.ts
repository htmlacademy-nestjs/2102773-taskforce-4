export interface Comment {
  id?: number;
  createdAt: Date;
  taskId?: number;
  message: string;
  userId: string;
}
