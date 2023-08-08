export interface Tag {
  tagId?: number;
  createdAt: Date;
  updatedAt: Date;
  taskId?: number;
  message: string;
  userId: string;
}
