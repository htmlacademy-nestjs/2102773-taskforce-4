import { CreateTaskSubscriberDto } from './dto/create-task-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UserRole } from '@project/shared/app-types';
import { EmailSubscriberError } from './email-subscriber.constant';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateTaskSubscriberDto) {
    const { title } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByTitle(title);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }

  public async getSubscribers(dto: CreateEmailDto) {

    if (dto.role !== UserRole.User) {
      throw new NotFoundException(EmailSubscriberError.RoleNotValid);
    }

    return this.emailSubscriberRepository.find(dto.requestDate)
  }
}
