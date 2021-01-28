import { Controller, UseGuards, Request, Get, Post, HttpException, HttpStatus, Body, Put, Param, UsePipes, Delete } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CustomValidationPipe } from 'src/core/validation.pipe';
import { SuccessResponse } from 'src/models/model';
import { sendSuccessResponse } from 'src/utility/utility';
import { ShoppingListService } from './shopping-list.service';
import { AddItemToListDto, ShoppingListDto, UpdateItemQuantityDto } from './shoppingList.dto';

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
  @UsePipes(new CustomValidationPipe())
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

  @Put('/:id/:itemId/updateQuantity')
  @UsePipes(new CustomValidationPipe())
  updateItemQuantity(@Request() req, @Param('id') shoppingListId: string, @Param('itemId') itemId: string, @Body() payload: UpdateItemQuantityDto): Observable<SuccessResponse>{
    return from(this.shoppingListService.updateItemQuantity(req.user.userId, shoppingListId, itemId, payload)).pipe(
      map((data) => {
        return sendSuccessResponse('Shopping list item quantity updated successfully', data)
      }),
      catchError((error) => {
        return throwError(new HttpException(error, HttpStatus.BAD_REQUEST))
      })
    )
  }

  @Post('/:id/addItem')
  @UsePipes(new CustomValidationPipe())
  addItemToList(@Request() req, @Param('id') shoppingListId: string, @Body() payload: AddItemToListDto): Observable<SuccessResponse>{
    return from(this.shoppingListService.addItem(req.user.userId, shoppingListId, payload)).pipe(
      map((data) => {
        return sendSuccessResponse('Shopping list updated successfully', data)
      }),
      catchError((error) => {
        return throwError(new HttpException(error, HttpStatus.BAD_REQUEST))
      })
    )
  }

  @Put('/:id/:itemId/delete')
  @UsePipes(new CustomValidationPipe())
  deleteItemFromList(@Request() req, @Param('id') shoppingListId: string, @Param('itemId') itemId: string){
    return from(this.shoppingListService.deleteItem(req.user.userId, shoppingListId, itemId)).pipe(
      map((data) => {
        return sendSuccessResponse('Shopping list item deleted', data);
      }),
      catchError((error) => {
        return throwError(new HttpException(error, HttpStatus.BAD_REQUEST))
      })
    )
  }

  @Put('/:id')
  updateShoppingList(@Request() req, @Param('id') shoppingListId: string, @Body() payload: Partial<ShoppingListDto>): Observable<SuccessResponse> {
    return from(this.shoppingListService.updateShoppingList(req.user.userId, shoppingListId, payload)).pipe(
      map((data) => {
        return sendSuccessResponse('Shopping list updated successfully', data)
      }),
      catchError((error) => {
        return throwError(new HttpException(error, HttpStatus.BAD_REQUEST))
      })
    )
  }
}
