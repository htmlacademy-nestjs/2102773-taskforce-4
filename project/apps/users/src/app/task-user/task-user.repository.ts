import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "@project/shared/app-types";
import { CRUDRepository } from "@project/util/util-types";
import { Model } from "mongoose";
import { TaskUserEntity } from "./task-user.entity";
import { TaskUserModel } from "./task-user.model";
import { UpdateUserDto } from "../authentication/dto/update-user.dto";

@Injectable()
export class TaskUserRepository implements CRUDRepository<TaskUserEntity, string, User> {
  constructor(
    @InjectModel(TaskUserModel.name) private readonly taskUserModel: Model<TaskUserModel>) {
  }

  public async create(item: TaskUserEntity): Promise<User> {
    const newTaskUser = new this.taskUserModel(item);
    return newTaskUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.taskUserModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.taskUserModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.taskUserModel
      .findOne({ email })
      .exec();
  }

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.taskUserModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  public async find(id: string): Promise<User[] | null> {
    return this.taskUserModel
      .find({}, {_id: id}, {})
      .sort({rating: -1})
      .exec();
  }
}
