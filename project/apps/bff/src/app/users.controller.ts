import { HttpService } from '@nestjs/axios';
import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Patch, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApplicationServiceURL } from './app.config';
import { LoginUserDto } from './dto/login-user.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestWithTokenPayload, TaskStatus } from '@project/shared/app-types';
import 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from 'form-data';
import { CheckAdminRoleGuard } from './guards/check-admin-role.guard';
import { NewReviewDto } from './dto/new-review.dto';
import { CheckUserRoleGuard } from './guards/check-user-role.guard';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/register`, createUserDto);
    return data;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async avatarUpload(@UploadedFile() file: Express.Multer.File,
  @Req() { user: payload }: RequestWithTokenPayload, @Req() req: Request) {


    if (file.size > 500000) {
      throw new BadRequestException('Размер файла превышает допустимый');
    }

    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });
    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
    };

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Upload}/upload`, formData, { headers });

    await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/update/${payload.sub}`, {avatar: data.path}, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });

    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Patch('update')
  public async update(@Body() UpdateUserDto: UpdateUserDto, @Req() { user: payload }: RequestWithTokenPayload, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/update/${payload.sub}`, UpdateUserDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Patch('changePassword')
  public async changePassword(@Body() ChangePasswordDto: ChangePasswordDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/changePassword`, ChangePasswordDto, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('/:userId')
  public async show(@Param('userId') userId: string, @Req() req: Request) {
    const taskCount = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Task}/user/${userId}`)).data
    const newTaskCount = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Task}/user/${userId}?status=${TaskStatus.New}`)).data

    await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Auth}/update/${userId}`, {newTaskCount: newTaskCount.length, taskCount: taskCount.length}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }
    });
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${userId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard, CheckAdminRoleGuard)
  @Post('/review')
  public async createReview(@Body() dto: NewReviewDto, @Req() { user: payload }: RequestWithTokenPayload) {

    const tasks = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Task}/tasksByContractor/${payload.sub}?contractorId=${dto.userId}`)).data

    if (tasks.length === 0) {
      throw new NotFoundException('Заказчики могут оставить отзыв только по тем исполнителям, которые выполняли его задания.');
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Review}`, dto);
    return data;
  }


  @UseGuards(CheckAuthGuard, CheckUserRoleGuard)
  @Post('/email')
  public async sendEmail(@Body() dto, @Req() { user: payload }: RequestWithTokenPayload) {
    const {requestDate} = dto
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Email}`, {email: payload.email, requestDate})
    return data
  }

}
