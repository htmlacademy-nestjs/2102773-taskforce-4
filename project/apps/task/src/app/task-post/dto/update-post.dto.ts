import { Transform } from "class-transformer";
import { IsString, MinLength, MaxLength, Min, IsNumber, MinDate, IsEnum, IsOptional } from "class-validator";
import { TaskPostError } from "../task-post.constant";
import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "@project/shared/app-types";

export class UpdatePostDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Решить задачу',
  })
  @IsOptional()
  @IsString()
  @MinLength(20, {message: TaskPostError.MinTitleLength})
  @MaxLength(50, {message: TaskPostError.MaxTitleLength})
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Решить задачу',
  })
  @IsOptional()
  @IsString()
  @MinLength(100, {message: TaskPostError.MinDescriptionLength})
  @MaxLength(1024, {message: TaskPostError.MaxDescriptionLength})
  public description: string;

  @ApiProperty({
    description: 'Task price',
    example: '100',
  })
  @IsOptional()
  @Min(0)
  public price?: number;

  @ApiProperty({
    description: 'Task address',
    example: 'Moskovsky st, 100',
  })
  @IsOptional()
  @IsString()
  @MinLength(10, {message: TaskPostError.MinAddressLength})
  @MaxLength(255, {message: TaskPostError.MaxAddressLength})
  public address?: string;

  @ApiProperty({
    description: 'Task city Id',
    example: '1',
  })
  @IsOptional()
  @IsNumber({}, {message: TaskPostError.CityId})
  public cityId: number;

  @ApiProperty({
    description: 'Task dedline',
    example: '16.08.2023',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  public dedline: Date;

  public image?: string;

  @ApiProperty({
    description: 'Task status',
    example: 'Новая',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  public status: TaskStatus;

  @ApiProperty({
    description: 'users Responses Id',
    example: '1',
  })
  @IsOptional()
  public usersResponsesId?: string[];

  @ApiProperty({
    description: 'contractor Id',
    example: '1',
  })
  @IsOptional()
  public contractorId?: string;

}
