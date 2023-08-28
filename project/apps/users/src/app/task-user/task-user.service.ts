import { Injectable } from "@nestjs/common";
import { TaskUserRepository } from "./task-user.repository";
import { User } from "@project/shared/app-types";

@Injectable()
export class TaskUserService {
  constructor(
    private readonly taskUserRepository: TaskUserRepository,
  ) {}

  async getUser(id: string): Promise<User> {
    return this.taskUserRepository.findById(id);
  }
}
