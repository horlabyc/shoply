import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import { User, UserSchema } from './user.schema';

export type CategoryDocument = Category & Document

@Schema()
export class Category {
  @Prop({required: true})
  name: String
  
  @Prop({default: new Date(Date.now())})
  createdAt: Date
}

export const CategorySchema = SchemaFactory.createForClass(Category);