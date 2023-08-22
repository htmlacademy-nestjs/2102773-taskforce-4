import { UserRole } from "@project/shared/app-types";

export class CreateSubscriberDto {
  public email: string;
  public firstname: string;
  public lastname: string;
  public role: UserRole;
}
