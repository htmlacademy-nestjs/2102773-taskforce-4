import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Review } from "@project/shared/app-types";
import { CRUDRepository } from "@project/util/util-types";
import { Model } from "mongoose";
import { ReviewEntity } from "./reviews.entity";
import { ReviewModel } from "./reviews.model";

@Injectable()
export class ReviewRepository implements CRUDRepository<ReviewEntity, string, Review> {
  constructor(
    @InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewEntity>) {
  }

  public async create(item: ReviewEntity): Promise<Review> {
    const newTaskUser = new this.reviewModel(item);
    return newTaskUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.reviewModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<Review | null> {
    return this.reviewModel
      .findOne({ _id: id })
      .exec();
  }

  public async update(id: string, item: ReviewEntity): Promise<Review> {
    return this.reviewModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
