export interface Comment {
  id?: number;
  createdAt: Date;
  updateAt: Date;
  taskId?: number;
  message: string;
  userId: string;
}
