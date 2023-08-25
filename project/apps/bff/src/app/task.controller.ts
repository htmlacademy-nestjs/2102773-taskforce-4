import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { AddNewTaskDto } from './dto/add-new-task.dto';
import { CheckRoleGuard } from './guards/check-role.guard';

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
    console.log(dto)
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Task}/`, dto);
    return data;
  }
}
