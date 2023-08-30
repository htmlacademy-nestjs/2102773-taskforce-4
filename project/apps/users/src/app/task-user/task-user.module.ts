import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserModel, TaskUserSchema } from './task-user.model';
import { TaskUserRepository } from './task-user.repository';
import { TaskUserService } from './task-user.service';
import { UserController } from './task-user.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TaskUserModel.name, schema: TaskUserSchema }
  ])],
  controllers: [UserController],
  providers: [TaskUserRepository, TaskUserService],
  exports: [TaskUserRepository, TaskUserService]
})
export class TaskUserModule {}
