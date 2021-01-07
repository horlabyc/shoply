import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
}
