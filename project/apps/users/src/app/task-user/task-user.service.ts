import { Injectable } from "@nestjs/common";
import { TaskUserRepository } from "./task-user.repository";
import { User } from "@project/shared/app-types";
import { TaskUserModel } from "./task-user.model";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class TaskUserService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
    @InjectModel(TaskUserModel.name) private readonly taskUserModel: Model<TaskUserModel>
  ) {}

  public async getUser(id: string): Promise<User> {
    return this.taskUserRepository.findById(id);
  }

  public async calculateRatingPlace(id: string): Promise<User> {
    const result = (await this.taskUserRepository.find(id))
    .findIndex(({_id}) => _id.toString() === id)
    return await this.taskUserModel.findByIdAndUpdate(id, {ratingPlace: result + 1}, {new: true}).exec();
  }

  public async calculateRating(id: Types.ObjectId): Promise<User> {

    const result = await this.taskUserModel
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'userId',
            as: 'reviews',
          },
        },
        {
          $group: {
            _id: '$_id',
            avgRating: {$max: {$divide: [{$sum: '$reviews.rating'}, {$add: [{$size: '$reviews.rating'}, {$size: '$failedTaskId'}]}]}}
          },
        },
    ])
   .exec();

    if (result.length === 0) {
      return null;
    }

    const rating = Number(result[0].avgRating).toFixed(2);

    return await this.taskUserModel.findByIdAndUpdate(id, {rating: rating}, {new: true}).exec();
  }


}
