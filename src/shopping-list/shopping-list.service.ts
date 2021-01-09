import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from 'src/schemas/item.schema';
import { ShoppingList, ShoppingListDocument } from 'src/schemas/shoppingList.schema';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingList.name) private shoppingModel: Model<ShoppingListDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>
  ){

  }

  async findAll(userId) {
    return await this.shoppingModel.find({user: userId})
  }

  async createNewShoppingList(userId, payload) {
    return new this.shoppingModel({
      ...payload,
      user: userId
    }).save();
  }

  async updateShoppingList(userId, shoppingListId, payload) {
    const toUpdate = {};
    if(payload.name){
      toUpdate['category'] = payload.category
    }
    if(payload.status){
      toUpdate['status'] = payload.status
    }
    const shoppingList = this.shoppingModel.findByIdAndUpdate({_id: shoppingListId, user: userId}, { $set: toUpdate}, { new: true}).exec();
    if(!shoppingList) {
      throw new HttpException({
        message: 'ITEM NOT FOUND',
      }, HttpStatus.NOT_FOUND)
    }
    return shoppingList;
  }

  async addItem(userId, shoppingListId, payload: {itemId: string}) {
    const shoppingList = await this.shoppingModel.findOne({_id: shoppingListId, user: userId});
    if(!shoppingList){
      throw new HttpException({
        message: 'Shopping List Not found',
      }, HttpStatus.NOT_FOUND)
    }
    const item = await this.itemModel.findOne({_id: payload.itemId, user: userId});
    if(!item){
      throw new HttpException({
        message: 'Item not found on user\'s account',
      }, HttpStatus.NOT_FOUND)
    }
    const itemIndex = shoppingList.items.findIndex((item) => item['_id'] == payload.itemId);
    if(itemIndex > -1){
      throw new HttpException({
        message: 'Item already exist on the list',
      }, HttpStatus.BAD_REQUEST)
    }
    shoppingList.items.push(item);
    shoppingList.updatedAt = new Date(Date.now());
    return await shoppingList.save();  
  }
}
