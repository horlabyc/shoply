import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import { Category, CategorySchema } from './category.schema';
import { User, UserSchema } from './user.schema';

export type ItemDocument = Item & Document

@Schema()
export class Item {
  @Prop({required: true})
  name: String
  
  @Prop({required: true})
  category: Category

  @Prop({ type: Types.ObjectId })
  user: User

  @Prop()
  description: String

  @Prop()
  extraNote: String

  @Prop()
  image: String

  @Prop()
  unitPrice: Number

  @Prop({default: 1})
  quantity: Number

  @Prop()
  unitMeasure: String

  @Prop({default: false})
  isAcquired: Boolean

  versionKey: false
}

export const ItemSchema = SchemaFactory.createForClass(Item);