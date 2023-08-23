import { CreateTaskSubscriberDto } from './dto/create-task-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Subscription')
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The email has been sent'
  })
  @Post()
  public async show(@Body() dto: CreateEmailDto) {
    const subscribers = await this.subscriberService.getSubscribers(dto)
    this.mailService.sendNotifyNewSubscriber(subscribers, dto.email);
  }
}
