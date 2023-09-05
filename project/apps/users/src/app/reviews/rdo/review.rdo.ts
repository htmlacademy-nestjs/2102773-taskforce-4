import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class ReviewRdo {
  @ApiProperty({
    description: 'The uniq review ID',
    example: '13'
  })
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public reviewId: string;

  @ApiProperty({
    description: 'Review message',
    example: 'Проверка',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Task id',
    example: '1',
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'Task user id',
    example: '1',
  })
  @Expose({ name: 'userId'})
  @Transform(({obj}) => obj.userId.toString())
  public userId: string;

  @ApiProperty({
    description: 'User rating',
    example: 5,
  })
  @Expose()
  public rating: number;
}
