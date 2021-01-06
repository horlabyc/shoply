import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingList, ShoppingListDocument } from 'src/schemas/shoppingList.schema';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingList.name) private shoppingModel: Model<ShoppingListDocument>
  ){

  }

  async findAll(userId) {
    return await this.shoppingModel.find({user: userId})
  }
}
