import { Entity } from '@project/util/util-types';
import { Subscriber, UserRole } from '@project/shared/app-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public email: string;
  public title: string;
  public description: string;
  public price?: number;
  public address?: string;
  public cityId: number;
  public dedline?: Date;
  public role: UserRole;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.title = entity.title;
    this.description = entity.description;
    this.price = entity.price;
    this.address = entity.address;
    this.cityId = entity.cityId;
    this.dedline = entity.dedline;
    this.id = entity._id;
    this.role = entity.role;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
