export interface iCategory {
  id: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface iCategoryResponse {
  categories: iCategory[];
  results: number;
  totalCount: number;
}
