import { ApiProperty } from "@nestjs/swagger";

export class AddNewTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Решить задачу',
  })
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Решить задачу',
  })
  public description: string;

  @ApiProperty({
    description: 'Task price',
    example: '100',
  })
  public price?: number;

  @ApiProperty({
    description: 'Task address',
    example: 'Moskovsky st, 100',
  })
  public address?: string;

  @ApiProperty({
    description: 'Task city Id',
    example: '1',
  })
  public cityId: number;

  @ApiProperty({
    description: 'Task category id',
    example: '1',
  })
  public categories: number[];

  @ApiProperty({
    description: 'Task tags',
    example: 'срочно',
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Task dedline',
    example: '16.08.2023',
  })
  public dedline?: Date;

  @ApiProperty({
    description: 'Task user id',
    example: '1',
  })
  public userId: string;
}
