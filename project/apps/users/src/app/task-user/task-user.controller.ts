import { Controller, HttpStatus, Get, Param } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { fillObject } from "@project/util/util-core";
import { UserRdo } from "../authentication/rdo/user.rdo";
import { TaskUserService } from "./task-user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: TaskUserService,
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'task found'
  })
  @Get('/:id')
  async show(@Param('id') id: string) {
    const user = await this.userService.getUser(id);
    return fillObject(UserRdo, user);
  }
}
