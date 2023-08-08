export class CreatePostDto {
  public title: string;
  public description: string;
  public price?: number;
  public address?: string;
  public city: string;
  public userId: string;
  public categories: number[];
  public tags?: string[];
  public dedline?: Date;
  public image?: string;
}
