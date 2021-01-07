import { Controller, UseGuards, Request, Get, Post, HttpException, HttpStatus, Body, Put, Param } from '@nestjs/common';
import { request } from 'express';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SuccessResponse } from 'src/models/model';
import { ShoppingListDocument } from 'src/schemas/shoppingList.schema';
import { sendSuccessResponse } from 'src/utility/utility';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListDto } from './shoppingList.dto';

@UseGuards(new JwtAuthGuard())
@Controller('shoppingList')
export class ShoppingListController {
  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  @Get()
  getShoppingLists(@Request() req): Observable<SuccessResponse> {
    return from(this.shoppingListService.findAll(req.user.userId)).pipe(
      map((data) => {
        return sendSuccessResponse('All shopping lists', data)
      }),
      catchError((error) => {
        return throwError(new HttpException(error, HttpStatus.BAD_REQUEST))
      })
    )
  }

  @Post()
  createShoppingList(@Request() req, @Body() payload: ShoppingListDto): Observable<SuccessResponse> {
    return from(this.shoppingListService.createNewShoppingList(req.user.userId, payload)).pipe(
      map((data) => {
        return sendSuccessResponse('Shopping list created successfully', data)
      }),
      catchError((error) => {
        return throwError(new HttpException(error, HttpStatus.BAD_REQUEST))
      })
    )
  }

  @Put('/:id')
  updateShoppingList(@Request() req, @Param('id') shoippingListId: string, @Body() payload: Partial<ShoppingListDto>): Observable<SuccessResponse> {
    return from(this.shoppingListService.updateShoppingList(req.user.userId, shoippingListId, payload)).pipe(
      map((data) => {
        return sendSuccessResponse('Shopping list updated successfully', data)
      }),
      catchError((error) => {
        return throwError(new HttpException(error, HttpStatus.BAD_REQUEST))
      })
    )
  }
}
