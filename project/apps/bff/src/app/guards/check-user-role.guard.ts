import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { UserRole } from '@project/shared/app-types';
import { UserError } from '../app.constant';

@Injectable()
export class CheckUserRoleGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/check`, {}, {
      headers: {
        'Authorization': request.headers['authorization']
      }
    })

    if (data.role !== UserRole.User) {
      throw new NotFoundException(UserError.RoleUser);
    }

    return true;

  }
}
