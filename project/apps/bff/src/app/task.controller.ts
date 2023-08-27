import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, Param, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { AddNewTaskDto } from './dto/add-new-task.dto';
import { CheckRoleGuard } from './guards/check-role.guard';
import { AddNewCommentDto } from './dto/add-new-comment.dto';
import { PostQuery } from './query/post.query';
import { CheckUserGuard } from './guards/check-user.guard';

@Controller('task')
@UseFilters(AxiosExceptionFilter)
export class TaskController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard, CheckRoleGuard)
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
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comment}/${id}`)
    return data;
  }
}
