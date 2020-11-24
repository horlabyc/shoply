import { IsNotEmpty } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  email: string

}