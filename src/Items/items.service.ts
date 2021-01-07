import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/operators'
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Item, ItemDocument } from 'src/schemas/item.schema';
import { formatItemResponse } from 'src/utility/item';
import { ItemListResponse } from './item';
import { ItemDTO } from './item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  )
  {}

  async findAll(userId, page, limit): Promise<ItemListResponse> {
    let total;
    limit = limit? parseInt(limit) : 15;
    if(page){
      page = page < 1 ? 0 : (parseInt(page) - 1) * limit;
    } else {
        page = 0;
    }

    const match = {user: userId}
    return new Promise((resolve, reject) => {
      this.itemModel.aggregate([
        {$match: match},
        {$group: {_id: '_id', total: {$sum: 1}}}
      ], async (err, doc) => {
        if(err) return reject(err);
        total = doc.length > 0? doc[0].total : 0;
        const totalPages = Math.ceil(total/limit);
        const response = {
          success: true,
          statusCode: HttpStatus.OK,
          data: {
            currentPage: Math.round(page / limit) + 1,
            totalPages,
            total,
            limit,
            items: await formatItemResponse([])
          }
        }
        if(total < 1){
          return resolve(response)
        }
        this.itemModel.aggregate([
          {$match: match},
          {$skip: page},
          {$limit: limit},
        ], async (err, docs) => {
          if(err) return reject(err);
          response.data.items = await formatItemResponse(docs);
          return resolve(response);
        })
      })
    })
  }

  async createItem(userId, data: ItemDTO): Promise<any> {
    const category = await this.categoryModel.findOne({ name: data.category.toUpperCase()}).exec();
    const item = await this.itemModel.findOne({ name: data.name}).exec();
    if(item) {
      throw new HttpException('Item with the same name already exists', HttpStatus.BAD_REQUEST)
    }
    data['user'] = userId;
    if(!category){
      await new this.categoryModel({
        name: data.category.toUpperCase(),
        user: userId
      }).save();
      return await new this.itemModel(data).save();
    } else {
      return await new this.itemModel(data).save();
    }
  }

  async getItem(userId, itemId) {
    const item = await this.itemModel.findOne({user: userId, _id: itemId}).exec();
    return item;
  }

  async updateItem(userId, itemId: string, data: Partial<ItemDTO>){
    const toUpdate = {};
    if(data.category){
      toUpdate['category'] = data.category
    }
    if(data.description){
      toUpdate['description'] = data.description;
    }
    if(data.name){
      toUpdate['name'] = data.name;
    }
    if(data.extraNote){
      toUpdate['extraNote'] = data.extraNote
    }
    if(data.isAcquired){
      toUpdate['isAcquired'] = data.isAcquired;
    }
    if(data.image){
      toUpdate['image'] = data.image;
    }
    if(data.quantity){
      toUpdate['quantity'] = data.quantity;
    }
    if(data.unitMeasure){
      toUpdate['unitMeasure'] = data.unitMeasure;
    }
    const Item = await this.itemModel.findByIdAndUpdate( {_id: itemId, user: userId}, { $set : toUpdate }, {new: true}).exec();
    if(!Item) {
      throw new HttpException({
        message: 'ITEM NOT FOUND',
      }, HttpStatus.NOT_FOUND)
    }
    return Item;
  }

  async deleteItem(userId, itemId: string) {
    const item = await this.itemModel.findOne({user: userId, _id: itemId}).exec();
    if(!item){
      throw new HttpException({
        message: 'ITEM NOT FOUND',
      }, HttpStatus.NOT_FOUND)
    }
    await this.itemModel.deleteOne({_id: item._id});
    return item;
  } 

  formatSuccessResponse(res){
    return {
      message: 'ITEM UPDATED SUCCESSFULLY',
      statusCode: HttpStatus.OK,
      data: res
    }
  }
}
