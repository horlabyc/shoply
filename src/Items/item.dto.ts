import { IsNotEmpty, IsString } from 'class-validator'

export class ItemDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string
  unitMeasure: string;
  description: string;
  extraNote: string;
  image: string;
  quantity: number;
  isAcquired: boolean;
}