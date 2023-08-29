import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@project/shared/app-types';
import { AuthUserError } from './authentication.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { TaskUserRepository } from '../task-user/task-user.repository';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload, makeUniq } from '@project/util/util-core';
import * as crypto from 'node:crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, firstname, lastname, password, dateBirth, city, role, specialization, personalInfo } = dto;

    const taskUser = {
      email, firstname, lastname, role, city, dateBirth, specialization: makeUniq(specialization), personalInfo,
      avatar: '', passwordHash: ''
    };

    const existUser = await this.taskUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUserError.Exists);
    }

    const userEntity = await new TaskUserEntity(taskUser)
      .setPassword(password)

    return this.taskUserRepository
      .create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.taskUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserError.NotFound);
    }

    const taskUserEntity = new TaskUserEntity(existUser);
    if (!await taskUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserError.PasswordWrong);
    }

    return taskUserEntity.toObject();
  }

  public async changePassword(id: string, dto: ChangePasswordDto) {
    const {password, newPassword} = dto;
    const user = await this.taskUserRepository.findById(id);

    const userEntity = new TaskUserEntity(user);

    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserError.PasswordWrong);
    }

    const newUserEntity = await userEntity.setPassword(newPassword)

    return this.taskUserRepository
      .update(id, newUserEntity);

  }

  public async getUser(id: string) {
    return this.taskUserRepository.findById(id);
  }

  public async updateUser(id: string, dto: UpdateUserDto) {
    return this.taskUserRepository
      .update(id, dto)
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }
}
