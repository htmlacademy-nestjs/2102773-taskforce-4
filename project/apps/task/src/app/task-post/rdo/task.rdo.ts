import { ApiProperty } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { Category, TaskStatus } from '@project/shared/app-types';
import { Expose, Transform } from 'class-transformer';

export class TaskRdo {
  @ApiProperty({
    description: 'The uniq task ID',
    example: '1'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Решить задачу',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Решить задачу',
  })
  @Expose()
  public description: string;

  @Expose()
  public publishAt: string;

  @ApiProperty({
    description: 'Task user Id',
    example: '1'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Task category Id',
    example: '1'
  })
  @Expose()
  public categories: Category[];

  @ApiProperty({
    description: 'Task comment Id',
    example: '1'
  })
  @Expose()
  public comments: Comment[];

  @ApiProperty({
    description: 'Task price',
    example: '100',
  })
  @Expose()
  public price?: number;

  @ApiProperty({
    description: 'Task address',
    example: 'Moskovsky st, 100',
  })
  @Expose()
  public address?: string;

  @ApiProperty({
    description: 'Task city',
    example: 'Moskow',
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'Task dedline',
    example: '16.08.2023',
  })
  @Expose()
  public dedline: Date;

  @ApiProperty({
    description: 'Task image',
    example: 'example.jpg',
  })
  @Expose()
  public image?: string;

  @ApiProperty({
    description: 'Task tags',
    example: 'срочно',
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Task status',
    example: 'срочно',
  })
  @Expose()
  public status: TaskStatus;

  @ApiProperty({
    description: 'contractor Id',
    example: '1',
  })
  @Expose()
  public contractorId?: string;

  @ApiProperty({
    description: 'users Responses count',
    example: 1,
  })
  @Expose({ name: 'usersResponsesId'})
  @Transform(({ value }) => value.length)
  public usersResponsesCount: number;

  @ApiProperty({
    description: 'Task create date',
    example: "2023-09-03T19:43:02.250Z",
  })
  @Expose({ name: 'publishAt'})
  public createDate: Date;
}
