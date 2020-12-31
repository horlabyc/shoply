import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if(!request.headers.authorization){
      return false;
    }
    let decodeToken;
    this.ValidateToken(request.headers.authorization).then((decode) => {
      decodeToken = decode;
      return true;
    }).catch((error) => {
      return false
    });
  }

  async ValidateToken(auth: string){
    if(auth.split(' ')[0] !== 'Bearer'){
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    const token = auth.split(' ')[1];
    try{
      const decoded = await jwt.verify(token, process.env.JWTSECRET);
      return decoded
    }catch(error) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
