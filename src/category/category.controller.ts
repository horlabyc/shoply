import { Body, Controller, Get, Post, UseGuards, UsePipes, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CustomValidationPipe } from 'src/core/validation.pipe';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {

  constructor(
    private categoryService: CategoryService
  ){

  }
  
  @Get()
  getAllCatgories(@Request() req){
    return this.categoryService.findAll(req.user.userId)
  }

  @Post()
  @UsePipes(new CustomValidationPipe())
  create(@Body() data: CategoryDTO, @Request() req){
    return this.categoryService.create(req.user.userId, data);
  }
}
