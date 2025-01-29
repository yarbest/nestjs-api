import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDTO } from 'src/users/dto/createUserDTO';

@Injectable()
export class ValidationPipe implements PipeTransform<CreateUserDTO> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype) {
      return value;
    }
    const instance = plainToInstance(metadata.metatype, value) as object;

    const errors = await validate(instance);

    if (errors.length) {
      const messages = errors.map((error) => {
        return `${error.property} - ${error.constraints ? Object.values(error.constraints).join(', ') : ''}`;
      });
      throw new HttpException({ messages }, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
