import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWTSECRET')
      }),
      inject: [ConfigService]
    }),
    // JwtModule.register({
    //   secret: `zq3lsKDRVGDGWTdOozcBbHeR8YiwM7TS`,
    //   signOptions: { expiresIn: '7d' },
    // }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
  ],
  controllers: [AuthController],
  exports: [PassportModule]
})
export class AuthModule {}
