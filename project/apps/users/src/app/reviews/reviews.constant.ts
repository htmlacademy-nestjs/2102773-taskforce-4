export enum Length {
  MinMessage = 50,
  MaxMessage = 500,
}

export enum Rating {
  Min = 1,
  Max = 5,
}

export enum ReviewsError {
  MinMessageLength = `Minimum message length must be ${Length.MinMessage}`,
  MaxMessageLength = `Maximum message length must be ${Length.MaxMessage}`,
  MinRating = `Minimum rating must be ${Rating.Min}`,
  MaxRating = `Maximum rating must be ${Rating.Max}`,
  ReviewCount = 'Одно выполненное задание — один отзыв',
}
