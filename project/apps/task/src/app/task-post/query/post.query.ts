import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_TASK_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../task-post.constant';

export class PostQuery {
  @Transform(({ value } ) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @Transform(({ value }) => value.split(',').map((categoryId) => +categoryId))
  @IsArray({})
  @IsOptional()
  public categories?: number[];

  @IsOptional()
  @Transform(({ value }) => value.split(',').map((tag) => tag))
  @IsArray({})
  public tag?: string[];

  @Transform(({ value }) => value.split(',').map((id) => +id))
  @IsOptional()
  public city?: number[];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsOptional()
  public contractorId: string;

  @IsOptional()
  public status: string;

  @IsOptional()
  public userId: string;
}
