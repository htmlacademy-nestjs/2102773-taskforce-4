import { CreateTaskSubscriberDto } from './dto/create-task-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';


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
    return this.emailSubscriberRepository.find(dto.requestDate)
  }
}
