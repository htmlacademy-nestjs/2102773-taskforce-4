import { Category } from "./category.interface";
import { Comment } from "./comment.interface";
import { Tag } from "./tag.interface";

export interface Task {
  id?: number;
  title: string;
  categories?: Category[];
  description: string;
  price?: number;
  address?: string;
  cityId: number;
  userId: string;
  comments?: Comment[];
  tags?: Tag[];
  dedline?: Date;
  image?: string;
  status: string;
  usersResponsesId?: string[];
  contractorId?: string;
  createdAt?: Date;
  publishAt?: Date;
}
