import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'New user password',
    example: '123456'
  })
  @IsString()
  public newPassword: string;
}
