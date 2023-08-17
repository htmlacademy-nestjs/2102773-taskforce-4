import { TaskCategoryService } from './task-category.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { CategoryRdo } from './rdo/category.rdo';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('categories')
export class TaskCategoryController {
  constructor(
    private readonly taskCategoryService: TaskCategoryService
  ) {}

  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatus.OK,
    description: 'Category found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existCategory = await this.taskCategoryService.getCategory(id);
    return fillObject(CategoryRdo, existCategory);
  }

  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatus.OK,
    description: 'All category found'
  })
  @Get('/')
  async index() {
    const categories = await this.taskCategoryService.getCategories();
    return fillObject(CategoryRdo, categories);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new category has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.taskCategoryService.createCategory(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category has been deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskCategoryService.deleteCategory(id);
  }

  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatus.OK,
    description: 'Category has been updeted.'
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.taskCategoryService.updateCategory(id, dto)
    return fillObject(CategoryRdo, updatedCategory);
  }
}
