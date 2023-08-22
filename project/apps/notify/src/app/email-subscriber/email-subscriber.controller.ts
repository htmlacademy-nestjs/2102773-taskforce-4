import { CreateTaskSubscriberDto } from './dto/create-task-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';

@Controller('email')
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'taskForce.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'taskForce.notify',
  })
  public async create(subscriber: CreateTaskSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
  }

  @Post()
  public async show(@Body() dto: CreateTaskSubscriberDto) {
    const subscribers = await this.subscriberService.getSubscribers()
    this.mailService.sendNotifyNewSubscriber(subscribers, dto.email);
  }
}
