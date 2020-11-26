import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema}])
  ],
  providers:[CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {
  
}
