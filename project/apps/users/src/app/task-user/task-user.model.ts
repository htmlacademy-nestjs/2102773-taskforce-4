import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserCity, UserRole } from '@project/shared/app-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class TaskUserModel extends Document implements User {
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public firstname: string;

  @Prop({
    required: true,
  })
  public lastname: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  public role: UserRole;

  @Prop({
    required: true,
    type: String,
    enum: UserCity,
    default: UserCity.Peterburg,
  })
  public city: UserCity;

  @Prop()
  public personalInfo: string;

  @Prop()
  public specialization: string[];

  @Prop()
  public failedTaskId: number[];

  @Prop()
  public doneTaskId: number[];

  @Prop()
  public failedTaskCount: number;

  @Prop()
  public doneTaskCount: number;

  @Prop()
  public newTaskCount: number;

  @Prop()
  public taskCount: number;

  @Prop()
  public publicTaskCount: number;

  @Prop()
  public rating: number;

  @Prop()
  public ratingPlace: number;
}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUserModel);
