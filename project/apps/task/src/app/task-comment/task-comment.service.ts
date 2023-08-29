import { Injectable } from '@nestjs/common';
import { TaskCommentRepository } from './task-comment.repository';
import { TaskCommentEntity } from './task-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '@project/shared/app-types';
import { PostQuery } from '../task-post/query/post.query';


@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentRepository
  ) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const commentEntity = new TaskCommentEntity(dto);
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
