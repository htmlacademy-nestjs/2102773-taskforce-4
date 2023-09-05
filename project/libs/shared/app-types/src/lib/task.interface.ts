import { Category } from "./category.interface";
import { Comment } from "./comment.interface";

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
  tags?: string[];
  dedline?: Date;
  image?: string;
  status: string;
  usersResponsesId?: string[];
  contractorId?: string;
  createdAt?: Date;
  publishAt?: Date;
}
