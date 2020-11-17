import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { Item, ItemSchema } from 'src/schemas/item.schema';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema},
      { name: Category.name, schema: CategorySchema}
  ]),
    ItemsModule
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
