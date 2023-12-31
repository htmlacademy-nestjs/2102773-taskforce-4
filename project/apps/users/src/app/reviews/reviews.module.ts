import { MongooseModule } from "@nestjs/mongoose";
import { ReviewModel, ReviewSchema } from "./reviews.model";
import { ReviewController } from "./reviews.controller";
import { Module, forwardRef } from "@nestjs/common";
import { ReviewRepository } from "./reviews.repository";
import { ReviewService } from "./reviews.service";
import { TaskUserModule } from "../task-user/task-user.module";


@Module({
  imports: [MongooseModule.forFeature([
    { name: ReviewModel.name, schema: ReviewSchema }
  ]), forwardRef(() => TaskUserModule)],
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService],
  exports: [ReviewRepository, ReviewService]
})
export class ReviewModule {}
