export class UpdatePostDto {
  public title: string;
  public description: string;
  public price?: number;
  public address?: string;
  public city: string;
  public dedline: Date;
  public image?: string;
}
