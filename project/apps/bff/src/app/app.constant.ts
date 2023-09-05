import { UserRole } from "@project/shared/app-types";

export enum TaskError {
  Status = 'Только на новые задачи можно откликаться',
  Role = 'Пользователь с этой ролью не может присвоить этот статус',
  Contractor = 'ContractorId not found',
  FileSize = 'Размер файла превышает допустимый',
}

export enum UserError {
  FileSize = 'Размер файла превышает допустимый',
  UserReview = 'Заказчики могут оставить отзыв только по тем исполнителям, которые выполняли его задания',
  AdminRole = `Только пользователь с ролью ${UserRole.Admin} может создавать задачи и категории`,
  RoleUser = `Только пользователь с ролью ${UserRole.User} может откликаться на задачи и оформлять email-рассылки`,
  DeleteComment = 'Пользователь может удалять только свои комментарии',
}

export enum FileSize {
  MaxAvatar = 500000,
  MaxTask = 1000000,
}
