import { Entity } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';

export class TaskCommentEntity implements Entity<TaskCommentEntity>, Comment {
  public commentId: number;
  public message: string;
  public taskId: number;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: Comment) {
    this.message = entity.message;
    this.commentId = entity.commentId;
    this.taskId = entity.taskId;
    this.userId = entity.userId;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  public toObject(): TaskCommentEntity {
    return { ...this }
  }
}
