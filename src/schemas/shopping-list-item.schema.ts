import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type ItemDocument = ShoppingListItem & Document

@Schema({ versionKey: false })
export class ShoppingListItem {
  @Prop({require: true})
  _id: string
  
  @Prop({required: true})
  name: string
  
  @Prop({required: true})
  category: string

  @Prop({ type: Types.ObjectId })
  user: string

  @Prop()
  description: string

  @Prop()
  extraNote: string

  @Prop({default: 1})
  quantity: number

  @Prop({default: 'pcs'})
  unitMeasure: string

  @Prop({default: false})
  isAcquired: boolean

  @Prop({default: false})
  isDeleted: boolean
}

export const ShoppingListItemSchema = SchemaFactory.createForClass(ShoppingListItem);