import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks'
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Keks'
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: 'User city',
    example: 'Санкт-Петербург'
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'Role',
    example: 'Исполнитель'
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'Personal information',
    example: 'Женат'
  })
  @Expose()
  public personalInfo: string;

  @ApiProperty({
    description: 'Specialization',
    example: 'электрик'
  })
  @Expose()
  public specialization: string[];

  @Expose()
  public doneTaskId: number[];

  @Expose()
  public failedTaskId: number[];
}
