import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@project/shared/app-types';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements  Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public price: number;

  @Prop()
  public address: string;

  @Prop()
  public cityId: number;

  @Prop()
  public dedline: Date;

  @Prop()
  public role: string;


}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
