import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserRole, TaskStatus } from '@project/shared/app-types';

@Injectable()
export class UserStatusInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;
    const {status} = request.query;

    if (userRole === UserRole.Admin && (status === TaskStatus.Canceled || status === TaskStatus.Work)) {
      request.body['newStatus'] = status;
    }

    if (userRole === UserRole.User && (status !== TaskStatus.Canceled || status !== TaskStatus.Work)) {
      request.body['newStatus'] = status;
    }

    return next.handle();
  }
}
