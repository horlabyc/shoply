import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metaData: ArgumentMetadata) {
    const { metatype } = metaData
    if(this.isEmpty(value)) {
      throw new HttpException(`Validation failed: No body provided`, HttpStatus.BAD_REQUEST)
    }
    if (!metatype || this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return types.includes(metatype);
  }

  private isEmpty(value:any) {
    if(Object.keys(value).length < 1) {
      return true
    }
    return false
  }

  // Format the error returned from validation
  private formatErrors(errors: any[]){
    return errors.map( error => {
        for (let key in error.constraints){
        return error.constraints[key]
        }
    }).join(', ');
  }

}