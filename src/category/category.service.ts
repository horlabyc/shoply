import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { CategoryDTO } from './category.dto';
import { ItemCategory } from './model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ){}

  async findAll(): Promise<{ message: string, statusCode: number, data: Category[]}> {
    const categories = await this.categoryModel.find().exec()
    return this.formatSuccessResponse(categories);
  }

  async create(data: CategoryDTO): Promise<any> {
    data.name = data.name.toUpperCase();
    const existingCategory = await this.categoryModel.findOne({ name: data.name}).exec();
    if(existingCategory){
      throw new HttpException('Category with the same name already exists', HttpStatus.BAD_REQUEST)
    }
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  formatSuccessResponse(res){
    return {
      message: 'success',
      statusCode: HttpStatus.OK,
      data: res
    }
  }
}
