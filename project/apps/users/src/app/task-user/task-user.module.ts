import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskUserModel, TaskUserSchema } from './task-user.model';
import { TaskUserRepository } from './task-user.repository';
import { TaskUserService } from './task-user.service';
import { UserController } from './task-user.controller';
import { ReviewModule } from '../reviews/reviews.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TaskUserModel.name, schema: TaskUserSchema }
  ]), forwardRef(() => ReviewModule)],
  controllers: [UserController],
  providers: [TaskUserRepository, TaskUserService],
  exports: [TaskUserRepository, TaskUserService]
})
export class TaskUserModule {}
