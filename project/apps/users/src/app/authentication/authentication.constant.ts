import { UserCity } from "@project/shared/app-types";

export enum AuthUserError {
  Exists = 'User with this email exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  DateBirthNotValid = 'The user date birth is not valid',
  CityNotValid = `The City must be ${UserCity.Moscow}, ${UserCity.Peterburg}, ${UserCity.Vladivostok}`,
  RoleNotValid = 'The role is not valid',
  MinPasswordLength = 'Minimum password length must be 6',
  MaxPasswordLength = 'Maximum password length must be 12',
  MaxPersInfoLength = 'Maximum PersInfo length must be 300',
  MaxSpecializationArrayLength = 'Maximum specialization count is 5'
}
