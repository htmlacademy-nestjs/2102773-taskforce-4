import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TokenPayload, User, UserRole } from '@project/shared/app-types';
import dayjs from 'dayjs';
import { AuthUserError } from './authentication.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { TaskUserEntity } from '../task-user/task-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { TaskUserRepository } from '../task-user/task-user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: CreateUserDto) {
    const {email, firstname, lastname, password, dateBirth, city} = dto;

    const taskUser = {
      email, firstname, lastname, role: UserRole.User, city,
      avatar: '', dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: ''
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

  public async getUser(id: string) {
    return this.taskUserRepository.findById(id);
  }

  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
