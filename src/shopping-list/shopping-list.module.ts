import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/schemas/item.schema';
import { ShoppingList, ShoppingListSchema } from 'src/schemas/shoppingList.schema';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListService } from './shopping-list.service';

@Module({
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
  imports: [
    MongooseModule.forFeature([
      {name: ShoppingList.name, schema: ShoppingListSchema},
      {name: Item.name, schema: ItemSchema}
    ])
  ]
})
export class ShoppingListModule {}
