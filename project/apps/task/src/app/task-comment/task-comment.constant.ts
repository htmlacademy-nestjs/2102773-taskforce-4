export enum MessageLength {
  MinLength = 10,
  MaxLength = 300
}

export enum TaskCommentError {
  MinMessageLength = `Minimum message length must be ${MessageLength.MinLength}`,
  MaxMessageLength = `Maximum message length must be ${MessageLength.MaxLength}`,
  TaskId = 'TaskId not found',
}
