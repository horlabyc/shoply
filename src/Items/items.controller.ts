import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ItemDTO, ItemListResponse } from './item';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(
    private itemsService: ItemsService
  ){

  }

  @Get()
  getAllItems(): Observable<ItemListResponse>{
    return this.itemsService.findAll();
  }

  @Post()
  createItem(@Body() data: ItemDTO) {

  }
}
