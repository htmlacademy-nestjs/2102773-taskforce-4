import { ApiProperty } from "@nestjs/swagger";
import { UserCity, UserRole } from "@project/shared/app-types";
import { ArrayMaxSize, IsEmail, IsEnum, IsOptional, IsString, MaxDate, MaxLength, MinLength } from "class-validator";
import { AuthUserError, Length, MIN_USER_AGE } from "../authentication.constant";
import dayjs from "dayjs";
import { Transform } from "class-transformer";

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
  @Transform(({ value }) => new Date(value))
  @MaxDate(dayjs(new Date()).subtract(MIN_USER_AGE, 'year').toDate(), {message: AuthUserError.DateBirthNotValid})
  public dateBirth: Date;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  @IsString()
  @MinLength(Length.MinName, {message: AuthUserError.MinNameLength})
  @MaxLength(Length.MaxName, {message: AuthUserError.MaxNameLength})
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @IsString()
  @MinLength(Length.MinName, {message: AuthUserError.MinNameLength})
  @MaxLength(Length.MaxName, {message: AuthUserError.MaxNameLength})
  public lastname: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(Length.MinPassword, {message: AuthUserError.MinPasswordLength})
  @MaxLength(Length.MaxPassword, {message: AuthUserError.MaxPasswordLength})
  public password: string;

  @ApiProperty({
    description: 'User city',
    example: 'Санкт-Петербург'
  })
  @IsEnum(UserCity, { message: AuthUserError.CityNotValid })
  public city: UserCity;

  @ApiProperty({
    description: 'Role',
    example: 'Исполнитель'
  })
  @IsEnum(UserRole, { message: AuthUserError.RoleNotValid })
  public role: UserRole;

  @ApiProperty({
    description: 'Personal information',
    example: 'Женат'
  })
  @IsOptional()
  @MaxLength(Length.MaxPersInfo, {message: AuthUserError.MaxPersInfoLength})
  public personalInfo?: string;

  @ApiProperty({
    description: 'Specialization',
    example: 'электрик'
  })
  @IsOptional()
  @ArrayMaxSize(Length.MaxSpecializationArray, {message: AuthUserError.MaxSpecializationArrayLength})
  public specialization?: string[];

  @ApiProperty({
    description: 'User avatar',
    example: 'example.jpg'
  })
  @IsOptional()
  public avatar?: string;
}
