import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CustomValidationPipe } from 'src/core/validation.pipe';
import { Item } from 'src/schemas/item.schema';
import { sendSuccessResponse } from 'src/utility/utility';
import { ItemDTO } from './item.dto';
import { ItemsService } from './items.service';

@UseGuards(new JwtAuthGuard())
@Controller('items')
export class ItemsController {
  constructor(
    private itemsService: ItemsService
  ){}

  @Get()
  getAllItems(@Request() req, @Query('page') page: number, @Query('limit') limit: number): Promise<any>{
    return this.itemsService.findAll(req.user.userId, +page, +limit);
  }

  @Post()
  @UsePipes(new CustomValidationPipe())
  async createItem(@Request() req, @Body() data: ItemDTO) {
    const newItem = await this.itemsService.createItem(req.user.userId, data);
    return sendSuccessResponse('Item created successfully', newItem);
  }

  @Get('/:id')
  async getItem(@Request() req, @Param('id') itemId: string) {
    const item = await this.itemsService.getItem(req.user.userId,itemId);
    return sendSuccessResponse('Item fetched successfully', item);
  }

  @Put('/:id')
  async updateItem(@Request() req, @Param('id') itemId: string, @Body() data: Partial<ItemDTO>) {
    const updatedItem = await this.itemsService.updateItem(req.user.userId, itemId, data)
    return sendSuccessResponse('Item updated successfully', updatedItem);
  }
}
