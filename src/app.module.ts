import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONNECTIONSTRING } from './config/db';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(CONNECTIONSTRING)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
