import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type CategoryDocument = Category & Document

@Schema({ versionKey: false })
export class Category {
  @Prop({required: true})
  name: string
  
  @Prop({default: new Date(Date.now())})
  createdAt: Date

  @Prop({required: true})
  user: string
}

export const CategorySchema = SchemaFactory.createForClass(Category);