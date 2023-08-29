import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '@project/shared/app-types';

export class StatusQuery {
  @IsEnum(TaskStatus, {message: 'Status is invalid'})
  @IsOptional()
  public status: TaskStatus;
}
