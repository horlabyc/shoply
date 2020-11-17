import { Document } from "mongoose";

export interface ItemCategory extends Document{
  name: string;
  createdAt: Date;
}