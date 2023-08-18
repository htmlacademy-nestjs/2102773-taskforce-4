import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryRdo {
  @ApiProperty({
    description: 'The uniq category ID',
    example: '1'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Category title',
    example: 'Сантехника',
  })
  @Expose()
  public title: string;
}
