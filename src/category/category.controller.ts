import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CustomValidationPipe } from 'src/core/validation.pipe';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

  constructor(
    private categoryService: CategoryService
  ){

  }
  @Get()
  getAllCatgories(){
    return this.categoryService.findAll()
  }

  @Post('/new')
  @UsePipes(new CustomValidationPipe())
  create(@Body() data: CategoryDTO){
    return this.categoryService.create(data);
  }
}
