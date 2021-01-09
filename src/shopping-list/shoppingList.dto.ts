import { IsNotEmpty, IsString } from 'class-validator'

export class ShoppingListDto {
  @IsNotEmpty()
  @IsString()
  name

  @IsNotEmpty()
  @IsString()
  user
}

export class AddItemToListDto {
  @IsNotEmpty()
  @IsString()
  itemId
}