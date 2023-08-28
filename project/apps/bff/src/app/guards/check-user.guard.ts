import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class CheckUserGuard implements CanActivate {
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

    const user = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comment}/${request.params.id}`);

    if (user.data.userId !== data.sub) {
      throw new NotFoundException(`Пользователь может удалять только свои комментарии`);
    }

    return true;
  }
}
