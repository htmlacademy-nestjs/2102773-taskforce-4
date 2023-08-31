import { ForbiddenException, Injectable } from '@nestjs/common';
import { TaskPostRepository } from './task-post.repository';
import { TaskCategoryRepository } from '../task-category/task-category.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { Task, TaskStatus } from '@project/shared/app-types';
import { TaskPostEntity } from './task-post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './query/post.query';
import { TaskCommentRepository } from '../task-comment/task-comment.repository';

@Injectable()
export class TaskPostService {
  constructor(
    private readonly taskPostRepository: TaskPostRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository,
    private readonly taskCommentRepository: TaskCommentRepository
  ) {}

  async createTask(dto: CreatePostDto): Promise<Task> {
    const categories = await this.taskCategoryRepository.find(dto.categories);
    const postEntity = new TaskPostEntity({ ...dto, categories, tags: [], status: TaskStatus.New });
    return this.taskPostRepository.create(postEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskPostRepository.destroy(id);
  }

  async getTask(id: number): Promise<Task> {
    return this.taskPostRepository.findById(id);
  }

  async getTasksByUserId(id: string, status: string): Promise<Task[]> {
    return this.taskPostRepository.findByUserId(id, status);
  }

  async getTasks(query: PostQuery): Promise<Task[]> {
    return this.taskPostRepository.find(query);
  }

  async updateTask(id: number, dto: UpdatePostDto, status: TaskStatus): Promise<Task> {
    const categories = (await this.taskPostRepository.findById(id)).categories;
    const comments = (await this.taskPostRepository.findById(id)).comments;
    const userId = (await this.taskPostRepository.findById(id)).userId;

    if (!status) {
      throw new ForbiddenException('Пользователь с этой ролью не может присвоить этот статус');
    }
    return this.taskPostRepository.update(id, new TaskPostEntity({...dto, status: status, categories, comments, userId}))
  }
}
