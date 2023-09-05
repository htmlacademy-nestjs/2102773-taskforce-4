import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, Min, Max, IsNumber } from "class-validator";
import { ReviewsError } from "../reviews.constant";
import { Types } from "mongoose";

export class NewReviewDto {
  @ApiProperty({
    description: 'Review message',
    example: 'Проверка',
  })
  @IsString()
  @MinLength(50, {message: ReviewsError.MinMessageLength})
  @MaxLength(500, {message: ReviewsError.MaxMessageLength})
  public message: string;

  @ApiProperty({
    description: 'Task id',
    example: '1',
  })
  public taskId: number;

  @ApiProperty({
    description: 'Task user id',
    example: '1',
  })
  public userId: Types.ObjectId;

  @ApiProperty({
    description: 'User rating',
    example: 5,
  })
  @IsNumber()
  @Min(1, {message: ReviewsError.MinRating})
  @Max(5, {message: ReviewsError.MaxRating})
  public rating: number;
}
