import { Controller, UseGuards, Request, Get, Post, HttpException, HttpStatus } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ShoppingListDocument } from 'src/schemas/shoppingList.schema';
import { sendSuccessResponse } from 'src/utility/utility';
import { ShoppingListService } from './shopping-list.service';

@UseGuards(new JwtAuthGuard())
@Controller('shoppingList')
export class ShoppingListController {
  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  @Get()
  getShoppingLists(@Request() req): Observable<any> {
    return from(this.shoppingListService.findAll(req.user.userId)).pipe(
      map((data) => {
        return sendSuccessResponse('All shopping lists', data)
      }),
      catchError((error) => {
        return throwError(new HttpException(error, HttpStatus.BAD_REQUEST))
      })
    )
  }

  // @Post()
  // createShoppingList(): Observable {

  // }
}
