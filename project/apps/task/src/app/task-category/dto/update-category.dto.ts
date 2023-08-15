import { IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  public title: string;
}
