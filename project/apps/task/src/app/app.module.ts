import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskPostModule } from './task-post/task-post.module';
import { NotifyModule } from './notify/notify.module';
import { ConfigTaskModule } from '@project/config/config-task';
import { TaskCommentModule } from './task-comment/task-comment.module';

@Module({
  imports: [
    PrismaModule,
    TaskCategoryModule,
    TaskCommentModule,
    TaskPostModule,
    NotifyModule,
    ConfigTaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
