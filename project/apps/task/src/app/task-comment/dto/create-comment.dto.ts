import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";
import { MessageLength, TaskCommentError } from "../task-comment.constant";

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'Проверка',
  })
  @IsString()
  @MinLength(MessageLength.MinLength, {message: TaskCommentError.MinMessageLength})
  @MaxLength(MessageLength.MaxLength, {message: TaskCommentError.MaxMessageLength})
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
