import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";
import { TaskCommentError } from "../task-comment.constant";

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'Проверка',
  })
  @IsString()
  @MinLength(10, {message: TaskCommentError.MinMessageLength})
  @MaxLength(300, {message: TaskCommentError.MaxMessageLength})
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
