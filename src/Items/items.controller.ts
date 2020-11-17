import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomValidationPipe } from 'src/core/validation.pipe';
import { ItemListResponse } from './item';
import { ItemDTO } from './item.dto';
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

  @Post('/create')
  @UsePipes(new CustomValidationPipe())
  createItem(@Body() data: ItemDTO) {
    return data;
  }
}
