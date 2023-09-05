import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@project/shared/app-types';
import { TaskCategoryRepository } from './task-category.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { TaskCategoryEntity } from './task-category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

const EXISTS_CATEGORY = 'Category with this title exists'

@Injectable()
export class TaskCategoryService {
  constructor(
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const categoryEntity = new TaskCategoryEntity(dto);

    const existCategory = await this.taskCategoryRepository.findByTitle(dto.title);

    if (existCategory) {
      throw new ConflictException(EXISTS_CATEGORY);
    }

    return this.taskCategoryRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    this.taskCategoryRepository.destroy(id);
  }

  async getCategory(id: number): Promise<Category> {
    return this.taskCategoryRepository.findById(id);
  }

  async getCategoryByTitle(title: string): Promise<Category> {
    return this.taskCategoryRepository.findByTitle(title);
  }

  async getCategories(): Promise<Category[]> {
    return this.taskCategoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    return this.taskCategoryRepository.update(id, new TaskCategoryEntity(dto));
  }
}
