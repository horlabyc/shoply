import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ){}

  async findAll(userId): Promise<{ message: string, statusCode: number, data: Category[]}> {
    const categories = await this.categoryModel.find({user: userId}).exec()
    return this.formatSuccessResponse(categories);
  }

  async create(userId, data: CategoryDTO): Promise<any> {
    data.name = data.name.toUpperCase();
    const existingCategory = await this.categoryModel.findOne({ name: data.name, user: userId}).exec();
    if(existingCategory){
      throw new HttpException('Category with the same name already exists', HttpStatus.BAD_REQUEST)
    }
    data['user'] = userId;
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
