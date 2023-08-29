import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { TaskUserModule } from '../task-user/task-user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/config/config-users';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    TaskUserModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    RefreshTokenModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthenticationModule {}
