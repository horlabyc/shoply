import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/operators'
import { Item, ItemDocument } from 'src/schemas/item.schema';
import { ItemListResponse } from './item';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>){

  }

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

  createItem(){}
}
