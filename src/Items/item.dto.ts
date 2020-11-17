import { IsNotEmpty, IsString } from 'class-validator'
import { Category } from 'src/schemas/category.schema';

export class ItemDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string
  
  @IsString()
  @IsNotEmpty()
  unitMeasure: string;

  description: string;
  extraNote: string;
  image: string;
  unitPrice: number;
  quantity: number;
  isAcquired: boolean
}