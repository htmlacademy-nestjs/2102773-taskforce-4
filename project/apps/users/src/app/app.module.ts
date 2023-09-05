import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { TaskUserModule } from './task-user/task-user.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModule } from './reviews/reviews.module';

@Module({
  imports: [
    AuthenticationModule,
    TaskUserModule,
    ReviewModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(
    getMongooseOptions()
)],
  controllers: [],
  providers: [],
})
export class AppModule {}
