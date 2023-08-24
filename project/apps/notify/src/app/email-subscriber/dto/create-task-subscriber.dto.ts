import { IsNotEmpty } from 'class-validator';
import { EmailSubscriberError } from '../email-subscriber.constant';

export class CreateTaskSubscriberDto {
  @IsNotEmpty({ message: EmailSubscriberError.Title })
  public title: string;
}
