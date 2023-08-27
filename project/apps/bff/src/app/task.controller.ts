import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { AddNewTaskDto } from './dto/add-new-task.dto';
import { CheckAdminRoleGuard } from './guards/check-admin-role.guard';
import { AddNewCommentDto } from './dto/add-new-comment.dto';
import { PostQuery } from './query/post.query';
import { CheckUserGuard } from './guards/check-user.guard';
import { makeUniq } from '@project/util/util-core';
import { CheckUserRoleGuard } from './guards/check-user-role.guard';
import { TaskStatus } from '@project/shared/app-types';

@Controller('task')
@UseFilters(AxiosExceptionFilter)
export class TaskController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Body() dto: AddNewTaskDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Task}/`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/comments')
  public async createComment(@Body() dto: AddNewCommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comment}/`, dto);
    return data;
  }

  @Get('/comments')
  public async indexComments(@Query() query: PostQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comment}/`, {params: query});
    return data;
  }

  @UseGuards(CheckAuthGuard, CheckUserGuard)
  @Delete('/comments/:id')
  public async deleteComment(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comment}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @UseInterceptors(UseridInterceptor)
  @Patch('/:id')
  public async addResponse(@Param('id') id: number, @Body() userId: string) {
    const task = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Task}/${id}`);

    if (task.data.status !== TaskStatus.New) {
      throw new NotFoundException(`Только на новые задачи можно откликаться`);
    }

    const usersResponsesId: string[] = task.data.usersResponsesId;
    usersResponsesId.push(...Object.values(userId))

    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Task}/${id}`,
      { usersResponsesId: makeUniq(usersResponsesId) }
      );
      return data;
  }

}
