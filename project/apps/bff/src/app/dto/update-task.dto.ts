import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "@project/shared/app-types";

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Решить задачу',
  })
  @IsOptional()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Решить задачу',
  })
  @IsOptional()
  public description: string;

  @ApiProperty({
    description: 'Task price',
    example: '100',
  })
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Task address',
    example: 'Moskovsky st, 100',
  })
  @IsOptional()
  public address?: string;

  @ApiProperty({
    description: 'Task city Id',
    example: '1',
  })
  @IsOptional()
  public cityId: number;

  @ApiProperty({
    description: 'Task dedline',
    example: '16.08.2023',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  public dedline: Date;

  public image?: string;

  @ApiProperty({
    description: 'Task status',
    example: 'Новая',
  })
  @IsOptional()
  public status: TaskStatus;

  @ApiProperty({
    description: 'users Responses Id',
    example: '1',
  })
  @IsOptional()
  public usersResponsesId?: string[];

  @ApiProperty({
    description: 'contractor Id',
    example: '1',
  })
  @IsOptional()
  public contractorId?: string;

}
