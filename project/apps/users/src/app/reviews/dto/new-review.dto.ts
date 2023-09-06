import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, Min, Max, IsNumber } from "class-validator";
import { Length, Rating, ReviewsError } from "../reviews.constant";
import { Types } from "mongoose";

export class NewReviewDto {
  @ApiProperty({
    description: 'Review message',
    example: 'Проверка',
  })
  @IsString()
  @MinLength(Length.MinMessage, {message: ReviewsError.MinMessageLength})
  @MaxLength(Length.MaxMessage, {message: ReviewsError.MaxMessageLength})
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
  @Min(Rating.Min, {message: ReviewsError.MinRating})
  @Max(Rating.Max, {message: ReviewsError.MaxRating})
  public rating: number;
}
