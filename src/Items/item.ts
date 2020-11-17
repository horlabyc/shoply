import { Item } from "src/schemas/item.schema";

export interface ItemListResponse {
  success?: boolean;
  statusCode?: number;
  data?: {
    page?: number;
    totalPages?: number;
    total: number;
    limit: number;
    items: Item[];
  }
}

export interface Category {
  name: string;
  createdAt: Date;
}