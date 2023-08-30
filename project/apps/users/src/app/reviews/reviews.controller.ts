import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ReviewRdo } from "./rdo/review.rdo";
import { ReviewService } from "./reviews.service";
import { Controller, HttpStatus, Get, Param, Body, Post } from "@nestjs/common";
import { fillObject } from "@project/util/util-core";
import { NewReviewDto } from "./dto/new-review.dto";
import { TaskUserService } from "../task-user/task-user.service";

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly userService: TaskUserService,
  ) {}

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'review found'
  })
  @Get('/:id')
  async show(@Param('id') id: string) {
    const user = await this.reviewService.getReview(id);
    return fillObject(ReviewRdo, user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The new review has been successfully created.'
  })
  @Post('/')
  public async create(@Body() dto: NewReviewDto) {
    await this.userService.calculateRating(dto.userId)
    const newReview = await this.reviewService.createReview(dto);
    return fillObject(ReviewRdo, newReview);
  }
}
