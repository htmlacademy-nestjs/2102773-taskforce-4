import { ApiProperty } from "@nestjs/swagger";
import { UserCity } from "@project/shared/app-types";
import { IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateUserDto {
  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
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
  public city: UserCity;

  @ApiProperty({
    description: 'Personal information',
    example: 'Женат'
  })
  @IsOptional()
  public personalInfo?: string;

  @ApiProperty({
    description: 'Specialization',
    example: 'электрик'
  })
  @IsOptional()
  public specialization?: string[];

  @ApiProperty({
    description: 'User avatar',
    example: 'example.jpg'
  })
  @IsOptional()
  public avatar?: string;
}
