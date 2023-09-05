import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TaskController } from './task.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_TIMEOUT, HTTP_CLIENT_MAX_REDIRECTS } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    UsersController,
    TaskController,
    CategoryController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
