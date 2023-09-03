import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class NewReviewDto {
  @ApiProperty({
    description: 'Review message',
    example: 'Проверка',
  })
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
  public rating: number;
}
