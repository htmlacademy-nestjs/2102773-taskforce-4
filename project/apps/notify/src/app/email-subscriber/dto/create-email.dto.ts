import { IsDate, IsEmail, IsEnum } from 'class-validator';
import { EmailSubscriberError } from '../email-subscriber.constant';
import { UserRole } from '@project/shared/app-types';
import { ApiProperty } from "@nestjs/swagger";

export class CreateEmailDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: EmailSubscriberError.EmailNotValid })
  public email?: string;

  @ApiProperty({
    description: 'Role',
    example: 'Исполнитель'
  })
  @IsEnum(UserRole, { message: EmailSubscriberError.RoleNotValid })
  public role: UserRole;

  @ApiProperty({
    description: 'Date of request',
    example: '1981-03-12',
  })
  @IsDate({message: EmailSubscriberError.DateNotValid})
  public requestDate: Date;
}
