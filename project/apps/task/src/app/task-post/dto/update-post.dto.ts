export class UpdatePostDto {
  public title: string;
  public description: string;
  public price?: number;
  public address?: string;
  public cityId: number;
  public dedline: Date;
  public image?: string;
}
