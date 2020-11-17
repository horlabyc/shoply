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

  findAll(): Observable<ItemListResponse> {
    return from(this.itemModel.find().exec()).pipe(
      map((res) => {
        return {
          success: true,
          statusCode: HttpStatus.OK,
          data: {
            page: 1,
            total: 100,
            totalPages: 2,
            limit: 5,
            items: res
          }
        }
      })
    )
  }

  async createItem(data: ItemDTO): Promise<Item> {
    const category = await this.categoryModel.findOne({ name: data.category}).exec();
    if(!category){
      await new this.categoryModel({
        name: data.category
      }).save();
      return new this.itemModel(data).save();
    } else {
      throw new HttpException({
        errorMessage: 'Category already exists',
      }, HttpStatus.BAD_REQUEST)
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
