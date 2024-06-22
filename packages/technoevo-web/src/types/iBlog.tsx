import { iCategory } from './iCategory';

export interface iBlog {
  id?: string;
  blog_Title?: string;
  blog_des?: string;
  url?: string;
  thumbnail_Url?: string;
  categories?: iCategory[];
  createdAt?: Date;
  updatedAt?: Date;
  is_Active?: boolean;
  is_Commenting?: boolean;
  likes?: number;
  dislikes?: number;
}
export interface iBlogResponse {
  blogs: iBlog[];
  results: number;
  totalCount: number;
}
