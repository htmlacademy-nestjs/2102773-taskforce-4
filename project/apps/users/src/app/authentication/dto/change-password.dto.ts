import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";
import { AuthUserError } from "../authentication.constant";

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
  @MinLength(6, {message: AuthUserError.MinPasswordLength})
  @MaxLength(12, {message: AuthUserError.MaxPasswordLength})
  public newPassword: string;
}
