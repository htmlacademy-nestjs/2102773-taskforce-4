import { UserCity } from './user-city.enum';
import {UserRole} from './user-role.enum';

export interface User {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  dateBirth: Date;
  avatar: string;
  passwordHash: string;
  role: UserRole;
  city: UserCity;
  personalInfo?: string;
  specialization?: string[];
  failedTaskId?: number[];
  doneTaskId?: number[];
  newTaskCount?: number;
  taskCount?: number;
  publicTaskCount?: number;
  rating?: number;
  ratingPlace?: number;
}
