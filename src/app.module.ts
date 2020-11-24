import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { HttpExceptionFilter } from './core/exception.filter';
import { LoggingInterceptor } from './core/logging.interceptor';
import { ItemsModule } from './Items/items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.CONNECTIONSTRING, { useNewUrlParser: true }),
    ItemsModule,
    CategoryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, useClass: LoggingInterceptor
    },
    {
      provide: APP_FILTER, useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {}
