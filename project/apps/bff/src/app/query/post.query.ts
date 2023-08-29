import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

const DEFAULT_TASK_COUNT_LIMIT = 25;
const DEFAULT_SORT_DIRECTION = 'desc';

export class PostQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @Transform(({ value }) => value.split(',').map((categoryId) => +categoryId))
  @IsArray({})
  @IsOptional()
  public categories?: number[];

  @Transform(({ value }) => value.split(',').map((tagId) => +tagId))
  @IsArray({})
  @IsOptional()
  public tags?: number[];

  @Transform(({ value }) => value.split(',').map((id) => +id))
  @IsOptional()
  public city?: number[];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
