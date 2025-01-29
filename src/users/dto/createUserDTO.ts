import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
  @IsString({ message: 'must be a string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;
  @ApiProperty({ example: '123456', description: 'user password' })
  @IsString({ message: 'must be a string' })
  @Length(3, 12, { message: 'password must be between 4 and 16 characters' })
  password: string;
}
