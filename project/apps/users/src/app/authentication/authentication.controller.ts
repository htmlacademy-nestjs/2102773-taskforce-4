import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { fillObject } from '@project/util/util-core';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestWithTokenPayload, RequestWithUser, UserRole } from '@project/shared/app-types';
import { AdminUserRdo } from './rdo/admin-user.rdo';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }


  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }


  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    if (existUser.role === UserRole.Admin) {
      return fillObject(AdminUserRdo, existUser);
    }
    return fillObject(UserRdo, existUser);
  }


  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }


  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been updated.'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  public async update(@Body() dto: UpdateUserDto, @Param('id', MongoidValidationPipe) id: string) {
    const updateUser = await this.authService.updateUser(id, {...dto});
    return fillObject(UserRdo, updateUser);
  }


  @UseGuards(JwtAuthGuard)
  @Patch('changePassword')
  public async changePassword(@Body() dto: ChangePasswordDto, @Req() { user: payload }: RequestWithTokenPayload) {
    const changePassword = await this.authService.changePassword(payload.sub, dto);
    return fillObject(UserRdo, changePassword)
  }

}
