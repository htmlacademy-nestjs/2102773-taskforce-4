import { IsString, MinLength, MaxLength, Min, IsNumber, IsISO8601, MinDate } from "class-validator";

export class UpdatePostDto {
  @IsString()
  @MinLength(20, {message: 'Minimum title length must be 20'})
  @MaxLength(50, {message: 'Maximum title length must be 50'})
  public title: string;

  @IsString()
  @MinLength(100, {message: 'Minimum description length must be 100'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description: string;

  @Min(0)
  public price?: number;

  @IsString()
  @MinLength(10, {message: 'Minimum address length must be 10'})
  @MaxLength(255, {message: 'Maximum address length must be 255'})
  public address?: string;

  @IsNumber({}, {message: 'city is required'})
  public cityId: number;

  @IsISO8601({}, { message: 'The dedline date is not valid' })
  @MinDate(() => {return new Date()})
  public dedline: Date;
  public image?: string;
}
