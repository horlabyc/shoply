import { Body, Controller, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { CustomValidationPipe } from 'src/core/validation.pipe';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
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

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @UsePipes(new CustomValidationPipe())
  async login(@Request() req){
    return this.authService.login(req.user.user);
  }
}
