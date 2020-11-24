import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CustomValidationPipe } from 'src/core/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { RegisterDTO } from './register.dto';

@Controller('auth')
export class AuthController {
  constructor( private authService: AuthService){

  }

  @Post('register')
  @UsePipes(new CustomValidationPipe())
  async create(@Body() payload: RegisterDTO){
    return await this.authService.createAccount(payload)
  }

  @Post('login')
  @UsePipes(new CustomValidationPipe())
  async login(@Body() payload: LoginDTO){
    return await this.authService.login(payload)
  }
}
