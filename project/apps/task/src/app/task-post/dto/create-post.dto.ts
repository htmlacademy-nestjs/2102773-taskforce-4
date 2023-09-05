import { Transform } from "class-transformer";
import { ArrayMaxSize, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinDate, MinLength } from "class-validator";
import { TaskPostError } from "../task-post.constant";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Решить задачу',
  })
  @IsString()
  @MinLength(20, {message: TaskPostError.MinTitleLength})
  @MaxLength(50, {message: TaskPostError.MaxTitleLength})
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Решить задачу',
  })
  @IsString()
  @MinLength(100, {message: TaskPostError.MinDescriptionLength})
  @MaxLength(1024, {message: TaskPostError.MaxDescriptionLength})
  public description: string;

  @ApiProperty({
    description: 'Task price',
    example: '100',
  })
  @Min(0)
  public price?: number;

  @ApiProperty({
    description: 'Task address',
    example: 'Moskovsky st, 100',
  })
  @IsString()
  @MinLength(10, {message: TaskPostError.MinAddressLength})
  @MaxLength(255, {message: TaskPostError.MaxAddressLength})
  public address?: string;

  @ApiProperty({
    description: 'Task city Id',
    example: '1',
  })
  @IsNumber({}, {message: TaskPostError.CityId})
  public cityId: number;

  @ApiProperty({
    description: 'Task user id',
    example: '1',
  })
  public userId: string;

  @ApiProperty({
    description: 'Task category id',
    example: '1',
  })
  public categories: number[];

  @ApiProperty({
    description: 'Task dedline',
    example: '16.08.2023',
  })
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  public dedline?: Date;

  @ApiProperty({
    description: 'Task image',
    example: 'example.jpg',
  })
  public image?: string;

  @ApiProperty({
    description: 'Tags for task',
    example: 'strong',
  })
  @IsOptional()
  @ArrayMaxSize(5, {message: TaskPostError.MaxTagsArrayLength})
  @Matches(/^[a-zа-яё][^0-9\s,.;:]*$/, {
    each: true,
    message: TaskPostError.RegExp
  })
  @MaxLength(10, {
    each: true,
    message: 'max 10',
  })
  @MinLength(3, {
    each: true,
    message: 'min 3',
  })
  @Transform(({ value }) => value.map((tag: string) => tag.toLowerCase()))
  public tags?: string[];
}
