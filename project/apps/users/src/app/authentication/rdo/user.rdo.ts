import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import dayjs from 'dayjs';

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

  @Expose({ name: 'doneTaskId'})
  @Transform(({ value }) => value.length)
  public doneTaskCount: number;

  @Expose({ name: 'failedTaskId'})
  @Transform(({ value }) => value.length)
  public failedTaskCount: number;

  @ApiProperty({
    description: 'User avatar',
    example: 'example.jpg'
  })
  @Expose()
  public avatar: string;

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
    description: 'User rating',
    example: 5
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'User rating place',
    example: 2
  })
  @Expose()
  public ratingPlace: number;
}
