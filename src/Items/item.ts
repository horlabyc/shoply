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

export interface ItemDTO {
  name: string;
  category: Category
  user: any;
  description: string;
  extraNote?: string;
  image?: string;
  unitPrice: number;
  quantity: number;
  unitMeasure: string;
  isAcquired: boolean
}

export interface Category {
  name: string;
  createdAt: Date;
}