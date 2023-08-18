import { UserCity } from "@project/shared/app-types";

export enum AuthUserError {
  Exists = 'User with this email exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  DateBirthNotValid = 'The user date birth is not valid',
  CityNotValid = `The City must be ${UserCity.Moscow}, ${UserCity.Peterburg}, ${UserCity.Vladivostok}`
}
