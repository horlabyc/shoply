import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type ItemDocument = ItemCategory & Document

@Schema()
export class ItemCategory {
  @Prop({required: true})
  name: String
  
  @Prop({required: true, default: new Date(Date.now())})
  createdAt: Date
}

export const ItemCategorySchema = SchemaFactory.createForClass(ItemCategory);