import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'

export class ShoppingListDto {
  @IsNotEmpty()
  @IsString()
  name
}

export class AddItemToListDto {
  @IsNotEmpty()
  @IsString()
  itemId
}

export class UpdateItemQuantityDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity
}