import { Category } from "./category.interface";
import { Comment } from "./comment.interface";
import { UserCity } from "./user-city.enum";

export interface Task {
  id?: number;
  title: string;
  categories: Category[];
  description: string;
  price?: number;
  address?: string;
  city: UserCity;
  userId: string;
  comments: Comment[];
  tags?: string[];
  dedline: Date;
  image?: string;
  createdAt?: Date;
  publishAt?: Date;
}
