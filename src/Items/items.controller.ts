import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(
    private itemsService: ItemsService
  ){

  }

  @Get()
  async getAllItems(){
    return await this.itemsService.findAll();
  }
}
