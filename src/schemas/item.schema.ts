import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import { Category } from './category.schema';
import { User } from './user.schema';

export type ItemDocument = Item & Document

@Schema({ versionKey: false })
export class Item {
  @Prop({required: true})
  name: string
  
  @Prop({required: true})
  category: Category

  @Prop({ type: Types.ObjectId })
  user: User

  @Prop()
  description: string

  @Prop()
  extraNote: string

  @Prop()
  image: string

  @Prop()
  unitPrice: number

  @Prop({default: 1})
  quantity: number

  @Prop()
  unitMeasure: string

  @Prop({default: false})
  isAcquired: boolean

  versionKey: false
}

export const ItemSchema = SchemaFactory.createForClass(Item);