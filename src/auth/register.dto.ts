import { IsNotEmpty } from "class-validator";

export class RegisterDTO {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  email: string

}