import { ApiProperty } from "@nestjs/swagger";
import { UserCity, UserRole } from "@project/shared/app-types";
import { IsEmail, IsEnum, IsISO8601, IsString } from "class-validator";
import { AuthUserError } from "../authentication.constant";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthUserError.EmailNotValid })
    public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: AuthUserError.DateBirthNotValid })
  public dateBirth: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'User city',
    example: 'Санкт-Петербург'
  })
  @IsEnum(UserCity, { message: AuthUserError.CityNotValid })
  public city: UserCity;

  @IsEnum(UserRole, { message: 'некорректная роль' })
  public role: UserRole;
}
