import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CommentRto {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '1'
  })
  @Expose()
  public commentId: string;

  @ApiProperty({
    description: 'Comment message',
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
  @Expose()
  public userId: string
}
