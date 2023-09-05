import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import dayjs from 'dayjs';

export class AdminUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1981-03-12'
  })
  @Expose()
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  public dateBirth: string;

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
    description: 'Register date (ISO format)',
    example: '03.09.2023'
  })
  @Expose({ name: 'createdAt'})
  public registerDate: Date;

  @ApiProperty({
    description: 'User age',
    example: 25
  })
  @Expose({ name: 'dateBirth'})
  @Transform(({ value }) => dayjs().diff(dayjs(value), 'year'))
  public age: number;

  @ApiProperty({
    description: 'Count of New Task',
    example: 1
  })
  @Expose()
  public newTaskCount: number;

  @ApiProperty({
    description: 'Count of Task',
    example: 1
  })
  @Expose()
  public taskCount: number;
}
