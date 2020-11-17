import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Category } from './item';

export class ItemDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: Category
  
  @IsNotEmpty()
  @IsString()
  description: string;

  extraNote: string;
  image: string;
  unitPrice: number;
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unitMeasure: string;
  isAcquired: boolean
}