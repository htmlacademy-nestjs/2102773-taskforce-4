import { Category, Tag } from '@project/shared/app-types';
import { Expose } from 'class-transformer';

export class TaskRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public publishAt: string;

  @Expose()
  public userId: string;

  @Expose()
  public categories: Category[];

  @Expose()
  public comments: Comment[];

  @Expose()
  public price?: number;

  @Expose()
  public address?: string;

  @Expose()
  public city: string;

  @Expose()
  public dedline: Date;

  @Expose()
  public image?: string;

  @Expose()
  public tags: Tag[];
}
