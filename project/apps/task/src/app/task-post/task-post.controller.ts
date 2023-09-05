import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskPostService } from './task-post.service';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './query/post.query';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotifyService } from '../notify/notify.service';

@ApiTags('task')
@Controller('tasks')
export class TaskPostController {
  constructor(
    private readonly taskPostService: TaskPostService,
    private readonly notifyService: NotifyService,
  ) {}

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'task found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const post = await this.taskPostService.getTask(id);
    return fillObject(TaskRdo, post);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'All task found'
  })
  @Get('/')
  async index(@Query() query: PostQuery) {
    const posts = await this.taskPostService.getTasks(query);
    return fillObject(TaskRdo, posts);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'All task by user found'
  })
  @Get('user/:id')
  async showTaskByUser(@Param('id') userId: string, @Query() {status}: PostQuery) {
    const posts = await this.taskPostService.getTasksByUserId(userId, status);
    return fillObject(TaskRdo, posts);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'All task by user found'
  })
  @Get('contractor/:id')
  async showTaskByContractor(@Param('id') userId: string) {
    const posts = await this.taskPostService.getTasksByContractorId(userId);
    return fillObject(TaskRdo, posts);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'All task by contractor and user found'
  })
  @Get('tasksByContractor/:id')
  async showTaskByUserAndContractor(@Param('id') userId: string, @Query() {contractorId}: PostQuery) {
    const posts = await this.taskPostService.getTasksByUserAndContractor(userId, contractorId);
    return fillObject(TaskRdo, posts);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.taskPostService.createTask(dto);
    const {title} = newPost;
    await this.notifyService.registerSubscriber({ title })
    return fillObject(TaskRdo, newPost);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task has been deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskPostService.deleteTask(id);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Task status has been updeted.'
  })
  @Patch('/:id')
  async changeTask(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updateTask = await this.taskPostService.updateTask(id, {...dto});
    return fillObject(TaskRdo, updateTask)
  }
}
