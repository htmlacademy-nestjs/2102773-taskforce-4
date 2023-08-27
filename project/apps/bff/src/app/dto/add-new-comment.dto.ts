import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddNewCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'Проверка',
  })
  @IsString()
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
  public userId: string
}
