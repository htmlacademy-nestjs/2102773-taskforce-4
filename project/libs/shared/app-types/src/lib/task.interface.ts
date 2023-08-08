import { Category } from "./category.interface";
import { Comment } from "./comment.interface";
import { Tag } from "./tag.interface";

export interface Task {
  id?: number;
  title: string;
  categories: Category[];
  description: string;
  price?: number;
  address?: string;
  city: string;
  userId: string;
  comments?: Comment[];
  tags?: Tag[];
  dedline?: Date;
  image?: string;
  createdAt?: Date;
  publishAt?: Date;
}
