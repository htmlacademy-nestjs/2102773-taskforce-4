import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskCommentRepository } from './task-comment.repository';
import { TaskCommentEntity } from './task-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '@project/shared/app-types';
import { PostQuery } from '../task-post/query/post.query';
import { TaskPostRepository } from '../task-post/task-post.repository';
import { TaskCommentError } from './task-comment.constant';


@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentRepository,
    private readonly taskPostRepository: TaskPostRepository,
  ) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const commentEntity = new TaskCommentEntity(dto);

    if (await this.taskPostRepository.findById(commentEntity.taskId) === null) {
      throw new NotFoundException(TaskCommentError.TaskId);
    }

    return this.taskCommentRepository.create(commentEntity);
  }

  async deleteComment(id: number): Promise<void> {
    this.taskCommentRepository.destroy(id);
  }

  async getComment(id: number): Promise<Comment> {
    return this.taskCommentRepository.findById(id);
  }

  async getComments(query: PostQuery): Promise<Comment[]> {
    return this.taskCommentRepository.findAndFilter(query);
  }
}
