import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONNECTIONSTRING } from './config/db';
import { LoggingInterceptor } from './core/logging.interceptor';
import { ItemsModule } from './Items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.CONNECTIONSTRING, { useNewUrlParser: true }),
    ItemsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
