export class CreatePostDto {
  public title: string;
  public description: string;
  public price?: number;
  public address?: string;
  public cityId: number;
  public userId: string;
  public categories: number[];
  public tags?: string[];
  public dedline?: Date;
  public image?: string;
}
