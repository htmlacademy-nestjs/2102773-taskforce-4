import { Review } from "@project/shared/app-types";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({
  collection: 'reviews',
  timestamps: true,
})

export class ReviewModel extends Document implements Review {
  @Prop()
  public taskId: number;

  @Prop()
  public message: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId
  })
  public userId: Types.ObjectId;

  @Prop()
  public rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
