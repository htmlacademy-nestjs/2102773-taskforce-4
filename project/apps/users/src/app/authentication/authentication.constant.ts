import { UserCity } from "@project/shared/app-types";

export enum Length {
  MinPassword = 6,
  MaxPassword = 12,
  MinName = 3,
  MaxName = 50,
  MaxPersInfo = 300,
  MaxSpecializationArray = 5,
}

export const MIN_USER_AGE = 18;

export enum AuthUserError {
  Exists = 'User with this email exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  DateBirthNotValid = 'The user date birth is not valid',
  CityNotValid = `The City must be ${UserCity.Moscow}, ${UserCity.Peterburg}, ${UserCity.Vladivostok}`,
  RoleNotValid = 'The role is not valid',
  MinPasswordLength = `Minimum password length must be ${Length.MinPassword}`,
  MaxPasswordLength = `Maximum password length must be ${Length.MaxPassword}`,
  MinNameLength = `Minimum name length must be ${Length.MinName}`,
  MaxNameLength = `Maximum name length must be ${Length.MaxName}`,
  MaxPersInfoLength = `Maximum PersInfo length must be ${Length.MaxPersInfo}`,
  MaxSpecializationArrayLength = `Maximum specialization count is ${Length.MaxSpecializationArray}`
}
