import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { AddNewTaskDto } from './dto/add-new-task.dto';
import { CheckAdminRoleGuard } from './guards/check-admin-role.guard';
import { AddNewCommentDto } from './dto/add-new-comment.dto';
import { PostQuery } from './query/post.query';
import { CheckUserGuard } from './guards/check-user.guard';
import { fillObject, makeUniq } from '@project/util/util-core';
import { CheckUserRoleGuard } from './guards/check-user-role.guard';
import { RequestWithTokenPayload, TaskStatus } from '@project/shared/app-types';
import { TaskRdo } from './rdo/task.rdo';
import { UserStatusInterceptor } from './interceptors/user-status.interceptor';

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
    const user = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.User}/${dto.userId}`)).data
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Task}/`, dto);
    return fillObject(TaskRdo, {...data, user: user});
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
  @Patch('response/:id')
  public async addResponse(@Param('id') id: number, @Body() {userId}) {
    const task = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Task}/${id}`)).data;

    if (task.status !== TaskStatus.New) {
      throw new NotFoundException(`Только на новые задачи можно откликаться`);
    }
    const usersResponsesId = task.usersResponsesId;

    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Task}/${id}`,
      { usersResponsesId: makeUniq([...usersResponsesId, userId]) }
      );
      return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor, UserStatusInterceptor)
  @Patch('status/:id')
  public async changeStatus(@Param('id') id: number, @Body() {newStatus, contractorId},
  @Query() {status}, @Req() req: Request, @Req() { user: payload }: RequestWithTokenPayload) {

    const user = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${payload.sub}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    })).data;

    const doneTasksId = user.doneTaskId;
    const failedTasksId = user.failedTaskId;

    if (newStatus === TaskStatus.Work) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Task}/${id}?status=${status}`, {status: newStatus, contractorId: contractorId});
      return data
    }

    if (newStatus === TaskStatus.Done) {
      await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/update/${payload.sub}`, {doneTaskId: [...doneTasksId, id], doneTaskCount: doneTasksId.length}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      })
    }

    if (newStatus === TaskStatus.Failed) {
      await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/update/${payload.sub}`, {failedTaskId: [...failedTasksId, id], failedTaskCount: failedTasksId.length}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      })
    }

      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Task}/${id}?status=${status}`, {status: newStatus});
      return data
  }

  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @UseInterceptors(UseridInterceptor)
  @Delete('/:id')
  public async deleteTask(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Task}/${id}`);
    return data;
  }
}
