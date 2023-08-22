export interface Subscriber {
  id?: string;
  email?: string;
  title: string;
  description: string;
  price?: number;
  address?: string;
  cityId: number;
  dedline?: Date;
  role: string;
}
