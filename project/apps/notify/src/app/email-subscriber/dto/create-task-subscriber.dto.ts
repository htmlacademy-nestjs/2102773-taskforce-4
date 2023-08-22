import { IsEmail, IsNotEmpty } from 'class-validator';
import { EMAIL_NOT_VALID, FIRST_NAME_IS_EMPTY, USER_ID_IS_EMPTY } from '../email-subscriber.constant';
import { UserRole } from '@project/shared/app-types';

export class CreateTaskSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email?: string;

  @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
  public title: string;

  @IsNotEmpty({ message: USER_ID_IS_EMPTY })
  public description: string;

  public price?: number;
  public address?: string;
  public cityId: number;
  public dedline?: Date;

  public role: UserRole;
}
