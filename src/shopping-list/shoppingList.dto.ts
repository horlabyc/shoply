import { IsNotEmpty, IsString } from 'class-validator'

export class ShoppingListDto {
  @IsNotEmpty()
  @IsString()
  name

  @IsNotEmpty()
  @IsString()
  user
}