import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CustomValidationPipe } from 'src/core/validation.pipe';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
@UseGuards(JwtAuthGuard)
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
