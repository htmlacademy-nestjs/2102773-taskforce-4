import { ApiProperty } from "@nestjs/swagger";
import { UserCity } from "@project/shared/app-types";
import { ArrayMaxSize, IsEnum, IsOptional, IsString, MaxDate, MaxLength } from "class-validator";
import dayjs from "dayjs";
import { Transform } from "class-transformer";

export class UpdateUserDto {
  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @MaxDate(dayjs(new Date()).subtract(18, 'year').toDate(), {message: ''})
  public dateBirth: Date;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  @IsOptional()
  @IsString()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  @IsOptional()
  @IsString()
  public lastname: string;

  @ApiProperty({
    description: 'User city',
    example: 'Санкт-Петербург'
  })
  @IsOptional()
  @IsEnum(UserCity, { message: '' })
  public city: UserCity;

  @ApiProperty({
    description: 'Personal information',
    example: 'Женат'
  })
  @IsOptional()
  @MaxLength(300, {message: ''})
  public personalInfo?: string;

  @ApiProperty({
    description: 'Specialization',
    example: 'электрик'
  })
  @IsOptional()
  @ArrayMaxSize(5, {message: ''})
  public specialization?: string[];
}
