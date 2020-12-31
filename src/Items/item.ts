import { Item } from "src/schemas/item.schema";

export interface ItemListResponse {
  success?: boolean;
  statusCode?: number;
  data?: {
    currentPage?: number;
    totalPages?: number;
    total: number;
    limit: number;
    items: {
      category: string;
      items: Item[]
    }[];
  }
}