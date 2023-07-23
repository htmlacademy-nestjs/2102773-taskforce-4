import { UserCity } from "@project/shared/app-types";

export class CreateUserDto {
  public email: string;
  public dateBirth: string;
  public firstname: string;
  public lastname: string;
  public password: string;
  public city: UserCity;
}
