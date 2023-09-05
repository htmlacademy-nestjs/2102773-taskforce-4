import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddNewCategoryDto {
  @ApiProperty({
    description: 'Category title',
    example: 'Сантехника',
  })
  @IsString()
  public title: string;
}
