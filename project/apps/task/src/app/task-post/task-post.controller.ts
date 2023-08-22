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
    status: HttpStatus.CREATED,
    description: 'The new task has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreatePostDto) {
    const newPost = await this.taskPostService.createTask(dto);
    const {title, description, price, address, cityId, dedline} = newPost;
    await this.notifyService.registerSubscriber({ title, description, price, address, cityId, dedline })
    return fillObject(TaskRdo, newPost);
  }

  // @Post('/email')
  // async email(@Query() query: PostQuery, @Body() email: string) {
  //   const posts = await this.taskPostService.getTasks(query);
  //   const [title, description, price, address, cityId, dedline] = posts;
  //   await this.notifyService.registerSubscriber(email, [title, description, price, address, cityId, dedline])
  // }

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
    description: 'Task has been updeted.'
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    const updatedTask = await this.taskPostService.updateTask(id, dto);
    return fillObject(TaskRdo, updatedTask)
  }
}
