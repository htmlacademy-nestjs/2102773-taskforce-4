import { Transform } from "class-transformer";
import { ArrayMaxSize, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinDate, MinLength } from "class-validator";
import { Length, TaskPostError } from "../task-post.constant";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Решить задачу',
  })
  @IsString()
  @MinLength(Length.MinTitle, {message: TaskPostError.MinTitleLength})
  @MaxLength(Length.MaxTitle, {message: TaskPostError.MaxTitleLength})
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Решить задачу',
  })
  @IsString()
  @MinLength(Length.MinDescription, {message: TaskPostError.MinDescriptionLength})
  @MaxLength(Length.MaxDescription, {message: TaskPostError.MaxDescriptionLength})
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
  @MinLength(Length.MinAddress, {message: TaskPostError.MinAddressLength})
  @MaxLength(Length.MaxAddress, {message: TaskPostError.MaxAddressLength})
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
  @ArrayMaxSize(Length.MaxTagsArray, {message: TaskPostError.MaxTagsArrayLength})
  @Matches(/^[a-zа-яё][^0-9\s,.;:]*$/, {
    each: true,
    message: TaskPostError.RegExp
  })
  @MaxLength(Length.MaxTag, {
    each: true,
    message: TaskPostError.MaxTagLength,
  })
  @MinLength(Length.MinTag, {
    each: true,
    message: TaskPostError.MinTagLength,
  })
  @Transform(({ value }) => value.map((tag: string) => tag.toLowerCase()))
  public tags?: string[];
}
