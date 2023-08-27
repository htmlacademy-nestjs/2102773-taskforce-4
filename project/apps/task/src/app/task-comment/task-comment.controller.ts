import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskCommentService } from './task-comment.service';
import { CommentRto } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostQuery } from '../task-post/query/post.query';

@ApiTags('comment')
@Controller('comments')
export class TaskCommentController {
  constructor(
    private readonly TaskCommentService: TaskCommentService
  ) {}

  @ApiResponse({
    type: CommentRto,
    status: HttpStatus.OK,
    description: 'Comment found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existComment = await this.TaskCommentService.getComment(id);
    return fillObject(CommentRto, existComment);
  }

  @ApiResponse({
    type: CommentRto,
    status: HttpStatus.OK,
    description: 'All comments found'
  })
  @Get('/')
  async index(@Query() query: PostQuery) {
    const comments = await this.TaskCommentService.getComments(query);
    return fillObject(CommentRto, comments);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  @Post('/')
  async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.TaskCommentService.createComment(dto);
    return fillObject(CommentRto, newComment);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment has been deleted.'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.TaskCommentService.deleteComment(id);
  }
}
