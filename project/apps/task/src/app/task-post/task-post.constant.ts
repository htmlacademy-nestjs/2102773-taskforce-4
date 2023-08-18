export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';

export enum TaskPostError {
  MinTitleLength = 'Minimum title length must be 20',
  MaxTitleLength = 'Maximum title length must be 50',
  MinDescriptionLength = 'Minimum description length must be 100',
  MaxDescriptionLength = 'Maximum description length must be 1024',
  MinAddressLength = 'Minimum address length must be 10',
  MaxAddressLength = 'Maximum address length must be 255',
  CityId = 'city is required',
}
