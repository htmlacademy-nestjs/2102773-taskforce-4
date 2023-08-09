import { Entity } from '@project/util/util-types';
import { Category, Task, Comment, Tag} from '@project/shared/app-types';

export class TaskPostEntity implements Entity<TaskPostEntity>, Task {
  public id: number;
  public title: string;
  public description: string;
  public price?: number;
  public address?: string;
  public cityId: number;
  public publishAt: Date;
  public userId: string;
  public comments?: Comment[];
  public categories: Category[];
  public tags?: Tag[];
  public dedline: Date;
  public image?: string;
  public createdAt: Date;

  constructor(post: Task) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Task): void {
    this.title = entity.title;
    this.description = entity.description;
    this.price = entity.price;
    this.address = entity.address;
    this.cityId = entity.cityId;
    this.publishAt = new Date();
    this.userId = entity.userId;
    this.comments = [];
    this.categories = [...entity.categories];
    this.tags = [];
    this.dedline = entity.dedline;
    this.image = entity.image;
    this.createdAt = new Date();
  }

  public toObject(): TaskPostEntity {
    return {
      ...this,
      categories: [...this.categories],
      comments: [...this.comments],
      tags: [...this.tags],
    };
  }

}
