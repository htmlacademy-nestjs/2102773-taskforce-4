import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mail } from "@project/shared/app-types";
import { Document } from 'mongoose';

@Schema({
  collection: 'mailings',
  timestamps: true,
})

export class MailModel extends Document implements  Mail {
  @Prop()
  public email: string;

  @Prop()
  public requestDate: Date;

}

export const MailSchema = SchemaFactory.createForClass(MailModel);
