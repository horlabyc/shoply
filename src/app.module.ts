import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { AllExceptionFilter } from './core/exception.filter';
import { LoggingInterceptor } from './core/logging.interceptor';
import { ItemsModule } from './Items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.CONNECTIONSTRING, { useNewUrlParser: true }),
    ItemsModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, useClass: LoggingInterceptor
    },
    {
      provide: APP_FILTER, useClass: AllExceptionFilter
    }
  ],
})
export class AppModule {}
