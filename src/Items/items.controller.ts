import { Body, Controller, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomValidationPipe } from 'src/core/validation.pipe';
import { Item } from 'src/schemas/item.schema';
import { ItemListResponse } from './item';
import { ItemDTO } from './item.dto';
import { ItemsService } from './items.service';

@Controller()
export class ItemsController {
  constructor(
    private itemsService: ItemsService
  ){}

  @Get('items')
  getAllItems(): Observable<ItemListResponse>{
    return this.itemsService.findAll();
  }

  @Post('item/new')
  @UsePipes(new CustomValidationPipe())
  createItem(@Body() data: ItemDTO): Promise<Item> {
    return this.itemsService.createItem(data);
  }

  @Put('item/:id')
  updateItem(@Param('id') itemId: string, @Body() data: Partial<ItemDTO>) {
    return this.itemsService.updateItem(itemId, data)
  }
}
