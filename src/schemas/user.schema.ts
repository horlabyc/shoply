import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as  bcrypt from 'bcryptjs';
export type UserDocument = User & Document

@Schema({ versionKey: false })
export class User {
  @Prop({required: true, unique: true})
  username: string

  @Prop({ required: true, unique: true})
  email: string

  @Prop({required: true})
  password: string

  @Prop()
  token: string
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next: Function) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err);
    bcrypt.hash(user['password'], salt, (err, hash) => {
      if(err) return next();
      user['password'] = hash;
      next();
    })
  })
});