import { HttpService } from '@nestjs/axios';
import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from 'form-data';
import { UserRdo } from './rdo/user.rdo';

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

  @Get('/:taskId')
  public async showTask(@Param('taskId') taskId: number, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Task}/${taskId}`);

    const user = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${data.userId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    })).data;

    console.log(data)

    return fillObject(TaskRdo, {...data, user: fillObject(UserRdo, user)});
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
  @Req() req: Request, @Req() { user: payload }: RequestWithTokenPayload) {

    const user = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${payload.sub}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    })).data;

    const task = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Task}/${id}`)).data;

    const doneTasksId = user.doneTaskId;
    const failedTasksId = user.failedTaskId;

      if (!newStatus) {
      throw new ForbiddenException('Пользователь с этой ролью не может присвоить этот статус');
    }

    if (!task.usersResponsesId.includes(contractorId)) {
      throw new NotFoundException('contractorId not found ');
    }

    if (newStatus === TaskStatus.Work) {
      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Task}/${id}`, {status: newStatus, contractorId: contractorId});
      return data
    }

    if (newStatus === TaskStatus.Done && doneTasksId) {
      await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/update/${payload.sub}`, {doneTaskId: [...doneTasksId, id]}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      })
    }

    if (newStatus === TaskStatus.Failed && failedTasksId) {
      await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/update/${payload.sub}`, {failedTaskId: [...failedTasksId, id]}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      })
    }

      const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Task}/${id}`, {status: newStatus});
      return data
  }

  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @UseInterceptors(UseridInterceptor)
  @Delete('/:id')
  public async deleteTask(@Param('id') id: number) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Task}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('image/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async avatarUpload(@UploadedFile() file: Express.Multer.File,
  @Req() req: Request, @Param('id') id: number) {


    if (file.size > 1000000) {
      throw new BadRequestException('Размер файла превышает допустимый');
    }

    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });
    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
    };

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Upload}/upload`, formData, { headers });

    await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Task}/${id}`, {image: data.path}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });

    return data;
  }
}
