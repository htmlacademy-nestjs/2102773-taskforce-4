export const DEFAULT_TASK_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = 'desc';

export enum Length {
  MinTitle = 20,
  MaxTitle = 50,
  MinDescription = 100,
  MaxDescription = 1024,
  MinAddress = 10,
  MaxAddress = 255,
  MaxTagsArray = 5,
  MinTag = 3,
  MaxTag = 10
}

export enum TaskPostError {
  MinTitleLength = `Minimum title length must be ${Length.MinTitle}`,
  MaxTitleLength = `Maximum title length must be ${Length.MaxTitle}`,
  MinDescriptionLength = `Minimum description length must be ${Length.MinDescription}`,
  MaxDescriptionLength = `Maximum description length must be ${Length.MaxDescription}`,
  MinAddressLength = `Minimum address length must be ${Length.MinAddress}`,
  MaxAddressLength = `Maximum address length must be ${Length.MaxAddress}`,
  CityId = 'city is required',
  MaxTagsArrayLength = `Maximum tags count is ${Length.MaxTagsArray}`,
  RegExp = 'The tag must be a word and not contain spaces',
  MinTagLength = `Minimum tag length must be ${Length.MinTag}`,
  MaxTagLength = `Maximum tag length must be ${Length.MaxTag}`,
}
