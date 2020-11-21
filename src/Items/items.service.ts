import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/operators'
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Item, ItemDocument } from 'src/schemas/item.schema';
import { ItemListResponse } from './item';
import { ItemDTO } from './item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  )
  {}

  async findAll(page = 1, limit = 15): Promise<ItemListResponse> {
    console.log({limit})
    const total = await this.itemModel.countDocuments();
    const items = await this.itemModel.find()
    .skip((limit * page) - limit)
    .limit(limit).exec();
    return {
      success: true,
      statusCode: HttpStatus.OK,
      data: {
        currentPage: page,
        totalPages: Math.ceil(total/limit),
        total,
        limit,
        items,
      }
    }
  }

  async createItem(data: ItemDTO): Promise<any> {
    const category = await this.categoryModel.findOne({ name: data.category}).exec();
    const item = await this.itemModel.findOne({ name: data.name}).exec();
    if(item) {
      throw new HttpException('Item with the same name already exists', HttpStatus.BAD_REQUEST)
    }
    if(!category){
      await new this.categoryModel({
        name: data.category
      }).save();
      return await new this.itemModel(data).save();
    } else {
      return await new this.itemModel(data).save();
    }
  }

  async updateItem(itemId: string, data: Partial<ItemDTO>){
    let toUpdate = {};
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
    if(data.unitPrice){
      toUpdate['unitPrice'] = data.unitPrice;
    }
    const Item = await this.itemModel.findByIdAndUpdate( {_id: itemId}, { $set : toUpdate }, {new: true}).exec();
    if(!Item) {
      throw new HttpException({
        message: 'ITEM NOT FOUND',
      }, HttpStatus.NOT_FOUND)
    }
    return this.formatSuccessResponse(Item);
  }

  formatSuccessResponse(res){
    return {
      message: 'ITEM UPDATED SUCCESSFULLY',
      statusCode: HttpStatus.OK,
      data: res
    }
  }
}
