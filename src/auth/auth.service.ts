import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginDTO } from './login.dto';
import { RegisterDTO } from './register.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ){

  }
  async createAccount(payload: RegisterDTO): Promise<any> {
    const existingUser = await this.userModel.findOne({ $or: [{username: payload.username}, { email: payload.email}]});
    if(existingUser){
      if(existingUser.email.toLowerCase() === payload.email) {
        throw new HttpException('User with the same email already exists', HttpStatus.BAD_REQUEST);
      }
      if(existingUser.username.toLowerCase() === payload.username) {
        throw new HttpException('User with the same username already exists', HttpStatus.BAD_REQUEST)
      }
    }
    const user = await new this.userModel(payload).save();
    return this.formatSuccessResponse({_id: user._id, email: user.email, username: user.username})
  }

  async login(payload: LoginDTO): Promise<any> {
    const existingUser = await this.userModel.findOne({ email: payload.email});
    if(!existingUser){
      throw new HttpException('User with the provided email does not exist', HttpStatus.BAD_REQUEST);
    }
    if(!await this.comparePassword(payload.password, existingUser.password)){
      throw new HttpException('Invalid email/password combination', HttpStatus.BAD_REQUEST);
    }
    existingUser.token = await this.generateToken(existingUser);
    const user = await existingUser.save();
    return this.formatSuccessResponse({_id: user._id, email: user.email, username: user.username, token: user.token}, 'Login successful')
  }

  async comparePassword(attempt, userPassword) {
    return await bcrypt.compare(attempt, userPassword);
  }

  async generateToken(user: UserDocument){
    const { _id, email, password } = user;
    return jwt.sign({ _id, email, password}, process.env.JWTSECRET, { expiresIn: "7d"})
  }

  formatSuccessResponse(res, msg='Success'){
    return {
      message: msg,
      statusCode: HttpStatus.OK,
      data: res
    }
  }
}
